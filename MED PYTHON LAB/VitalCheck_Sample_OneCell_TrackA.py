# VitalCheck: a ward vitals monitor
# Sample mini-project, Track A (Patient Vitals Monitor), MED23CL202 Python Programming Laboratory
#
# A nurse records each patient's temperature, pulse and blood pressure. VitalCheck flags
# abnormal readings at once, uses stricter limits for ICU patients, saves every reading
# in Google Drive, and shows a summary and charts.
# The normal limits are simplified teaching values. This is a student project, not a medical device.



# ── 1. Modules, and where the data file lives (Experiments 2, 5, 6) ──

import os
import csv
import statistics
from datetime import datetime

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

try:
    from google.colab import drive
    drive.mount("/content/drive")
    DATA_DIR = "/content/drive/MyDrive/MiniProject"      # permanent: Google Drive
except Exception:
    DATA_DIR = "vitals_data"                              # not in Colab, or Drive not connected
    print("Google Drive is not connected; saving in a local folder instead.")

os.makedirs(DATA_DIR, exist_ok=True)
DATA_FILE = os.path.join(DATA_DIR, "vitals.csv")
print("Readings are saved in:", DATA_FILE)


# ── 2. Limits (dictionaries) and my own exception (Experiments 1, 2, 8) ──

# Values outside these are impossible, so they are rejected as typing mistakes.
POSSIBLE = {"temp": (85.0, 115.0), "pulse": (20, 250), "systolic": (50, 260)}

# Simplified normal limits for an adult (teaching values, not clinical advice).
NORMAL = {"temp": (97.0, 100.3), "pulse": (60, 100), "systolic": (90, 139)}

# Stricter limits for ICU patients: smaller changes need attention sooner.
ICU_NORMAL = {"temp": (97.0, 99.4), "pulse": (60, 90), "systolic": (100, 129)}

UNITS = {"temp": "°F", "pulse": "beats/min", "systolic": "mmHg"}


class InvalidReadingError(Exception):
    """Raised when a vital sign is outside what any living patient can have."""
    pass


def check_possible(name, value):
    """Raise InvalidReadingError if a value is impossible; otherwise return it."""
    low, high = POSSIBLE[name]
    if value < low or value > high:
        raise InvalidReadingError(f"{name} {value} {UNITS[name]} is not possible (allowed {low}–{high}).")
    return value


# ── 3. Classes: encapsulation, inheritance, overriding (Experiments 3, 4) ──

class Patient:
    """A patient on the ward and their vital-sign readings."""

    def __init__(self, name, bed):
        self.name = name
        self.bed = bed
        self.__readings = []          # private: changed only through add_reading()

    def add_reading(self, temp, pulse, systolic, time=None):
        """Check a reading, then store it. Raises InvalidReadingError for impossible values."""
        check_possible("temp", temp)
        check_possible("pulse", pulse)
        check_possible("systolic", systolic)
        reading = {"time": time or datetime.now().strftime("%Y-%m-%d %H:%M"),
                   "temp": temp, "pulse": pulse, "systolic": systolic}
        self.__readings.append(reading)
        return reading

    def get_readings(self):
        """Return a copy, so outside code can't change the stored readings."""
        return list(self.__readings)

    def kind(self):
        return "Ward"

    def limits(self):
        """The normal limits used for this patient."""
        return NORMAL

    def status(self, reading):
        """Return a list of alerts for one reading (an empty list means all normal)."""
        alerts = []
        for name, (low, high) in self.limits().items():
            value = reading[name]
            if value > high:
                alerts.append(f"{name} HIGH ({value} {UNITS[name]})")
            elif value < low:
                alerts.append(f"{name} LOW ({value} {UNITS[name]})")
        return alerts


class ICUPatient(Patient):
    """An ICU patient: the same checks, with stricter limits."""

    def kind(self):
        return "ICU"

    def limits(self):                 # overrides Patient.limits()
        return ICU_NORMAL


# ── 4. Safe input and helper functions (Experiments 1, 2, 7) ──

def read_number(prompt, kind=float):
    """Ask until the user types a number; return it as an int or a float."""
    while True:
        try:
            if kind == int:
                return int(input(prompt))
            return float(input(prompt))
        except ValueError:
            print("  Please type a number, e.g. 98.6")


def alert_label(alerts):
    """Turn a list of alerts into one short label."""
    if not alerts:
        return "NORMAL"
    elif len(alerts) == 1:
        return "CHECK: " + alerts[0]
    else:
        return "URGENT: " + "; ".join(alerts)


def fahrenheit(celsius):
    """Convert a Celsius thermometer reading to °F."""
    return round(celsius * 9 / 5 + 32, 1)


# ── 5. Saving and loading the readings file (Experiments 5, 6) ──

FIELDS = ["time", "name", "bed", "kind", "temp", "pulse", "systolic"]


def save_reading(patient, reading, quiet=False):
    """Append one reading to the CSV file, writing the header the first time."""
    new_file = not os.path.exists(DATA_FILE)
    try:
        with open(DATA_FILE, "a", newline="") as f:
            writer = csv.writer(f)
            if new_file:
                writer.writerow(FIELDS)
            writer.writerow([reading["time"], patient.name, patient.bed, patient.kind(),
                             reading["temp"], reading["pulse"], reading["systolic"]])
    except OSError as e:
        print("Could not save the reading:", e)
    finally:
        if not quiet:
            print(f"  (file: {DATA_FILE})")


def load_patients():
    """Read the CSV file and rebuild every patient with their readings."""
    patients = {}
    if not os.path.exists(DATA_FILE):
        return patients
    with open(DATA_FILE, "r", newline="") as f:
        reader = csv.reader(f)
        next(reader)                                  # skip the header row
        for row in reader:
            time, name, bed, kind, temp, pulse, systolic = row
            if name not in patients:
                cls = ICUPatient if kind == "ICU" else Patient
                patients[name] = cls(name, bed)
            try:
                patients[name].add_reading(float(temp), int(pulse), int(systolic), time)
            except (ValueError, InvalidReadingError):
                print("  Skipped a damaged row:", row)
    return patients


# ── 6. A pandas summary of all readings (Experiment 9) ──

def summary():
    """Print each patient's average, lowest and highest readings, and every fever."""
    if not os.path.exists(DATA_FILE):
        print("No readings saved yet.")
        return None
    df = pd.read_csv(DATA_FILE)
    print("Readings saved:", df.shape[0])
    print()
    table = df.groupby("name")[["temp", "pulse", "systolic"]].agg(["mean", "min", "max"]).round(1)
    print(table)
    fevers = df[df["temp"] >= 100.4]
    print()
    print(f"Fever readings (100.4 °F or more): {len(fevers)}")
    if len(fevers) > 0:
        print(fevers[["time", "name", "temp"]].to_string(index=False))
    return df


# ── 7. Charts: Matplotlib and Seaborn (Experiment 10) ──

def chart_patient(df, name):
    """Line chart of one patient's temperature over time."""
    rows = df[df["name"] == name]
    if rows.empty:
        print("No readings for", name)
        return
    plt.figure(figsize=(7, 3.5))
    plt.plot(range(1, len(rows) + 1), rows["temp"], marker="o")
    plt.axhline(100.4, color="red", linestyle="--", label="Fever (100.4 °F)")
    plt.xticks(range(1, len(rows) + 1))
    plt.xlabel("Reading number")
    plt.ylabel("Temperature (°F)")
    plt.title(f"Temperature of {name}")
    plt.legend()
    plt.tight_layout()
    plt.show()


def chart_all(df):
    """Histogram of every temperature on the ward."""
    plt.figure(figsize=(7, 3.5))
    sns.histplot(data=df, x="temp", bins=8)
    plt.gca().yaxis.get_major_locator().set_params(integer=True)
    plt.xlabel("Temperature (°F)")
    plt.ylabel("Number of readings")
    plt.title("All temperatures on the ward")
    plt.tight_layout()
    plt.show()


# ── 8. The ward round: one call, every kind of patient (polymorphism) ──

def ward_round(patients):
    """Print the latest reading and alert label for every patient."""
    if not patients:
        print("No patients yet.")
        return
    temps = []
    for p in patients.values():
        readings = p.get_readings()
        if not readings:
            print(f"{p.name:10} bed {p.bed:6} {p.kind():4}  no readings")
            continue
        last = readings[-1]
        temps.append(last["temp"])
        print(f"{p.name:10} bed {p.bed:6} {p.kind():4}  {last['temp']} °F  {last['pulse']} bpm  "
              f"{last['systolic']} mmHg  ->  {alert_label(p.status(last))}")
    if temps:
        print(f"\nAverage latest temperature: {statistics.mean(temps):.1f} °F")


# ── 9. Sample readings, so the program can be tried without typing ──

def add_sample_readings(patients):
    """Add a few readings for three patients, and show one impossible value being refused."""
    samples = [
        (Patient, "Ravi", "12", [(98.6, 78, 118), (99.1, 82, 121), (100.8, 96, 128)]),
        (ICUPatient, "Meena", "ICU-3", [(98.9, 84, 124), (99.6, 92, 131)]),
        (Patient, "Sara", "14", [(97.9, 70, 112)]),
    ]
    for cls, name, bed, readings in samples:
        if name not in patients:
            patients[name] = cls(name, bed)
        for temp, pulse, systolic in readings:
            reading = patients[name].add_reading(temp, pulse, systolic)
            save_reading(patients[name], reading, quiet=True)
    print("Sample readings saved in", DATA_FILE)
    try:
        patients["Sara"].add_reading(150, 70, 112)
    except InvalidReadingError as e:
        print("Refused:", e)


# ── 10. The menu program ──

# `main` is just a name we chose: it is an ordinary function (Module 8) that holds the menu program.
# Defining it does not run it; the last line, main(), calls it and starts the menu.
def main():
    patients = load_patients()
    print(f"VitalCheck: {len(patients)} patient(s) loaded from the file.")
    while True:
        print("\n1 Add a patient   2 Add a reading   3 Ward round   4 Summary   5 Charts   6 Sample readings   0 Quit")
        choice = input("Choose: ").strip()
        if choice == "1":
            name = input("Patient name: ").strip().title()
            bed = input("Bed: ").strip()
            icu = input("ICU patient? (y/n): ").strip().lower() == "y"
            patients[name] = ICUPatient(name, bed) if icu else Patient(name, bed)
            print(f"Added {name} ({patients[name].kind()}).")
        elif choice == "2":
            name = input("Patient name: ").strip().title()
            if name not in patients:
                print("No such patient. Add them first (option 1).")
                continue
            unit = input("Temperature in C or F? ").strip().upper()
            temp = read_number("Temperature: ")
            if unit == "C":
                temp = fahrenheit(temp)
            pulse = read_number("Pulse (beats/min): ", int)
            systolic = read_number("Systolic BP (mmHg): ", int)
            try:
                reading = patients[name].add_reading(temp, pulse, systolic)
            except InvalidReadingError as e:
                print("Not saved:", e)
            else:
                save_reading(patients[name], reading)
                print(name, "->", alert_label(patients[name].status(reading)))
        elif choice == "3":
            ward_round(patients)
        elif choice == "4":
            summary()
        elif choice == "5":
            df = summary()
            if df is not None:
                chart_patient(df, input("Chart for which patient? ").strip().title())
                chart_all(df)
        elif choice == "6":
            add_sample_readings(patients)
        elif choice == "0":
            print("Goodbye. All readings are saved in", DATA_FILE)
            break
        else:
            print("Please choose 0 to 6.")


main()
