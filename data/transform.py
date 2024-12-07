import json


def process_json_file(filepath):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)["foodItems"]
    except FileNotFoundError:
        print(f"Error: File not found at '{filepath}'")
        return

    if not isinstance(data, list):
        print(f"Error: The JSON data in '{filepath}' must be a list of dictionaries.")
        return

    processed_data = []
    seen_names = set()
    for entry in data:
        if entry["name"] not in seen_names and entry["fatContent"] not in ("0", "+"):
            processed_data.append(entry)
            seen_names.add(entry["name"])

    try:
        with open(filepath, 'w') as f:
            json.dump(processed_data, f, indent=4)
    except Exception as e:
        print(f"Error writing to file: {e}")

    print(
        f"JSON file '{filepath}' processed successfully. Duplicates removed and invalid 'fatContent' entries deleted.")


# Example usage (replace with your file path):
filepath = "/data/food-items.json"  # Replace with your file path.
process_json_file(filepath)
