import os
import zipfile
import json
import uuid

def process_zip_files():
    # Get all .zip files in the current directory
    zip_files = [file for file in os.listdir() if file.endswith('.zip')]

    for zip_file in zip_files:
        with zipfile.ZipFile(zip_file, 'r') as zip_ref:
            # Extract all the contents into a temporary directory
            temp_dir = f'temp_{uuid.uuid4()}'
            os.makedirs(temp_dir, exist_ok=True)
            zip_ref.extractall(temp_dir)

            # Read the package.json file to get the "name" property
            package_json_path = os.path.join(temp_dir, 'package.json')
            with open(package_json_path, 'r') as package_file:
                package_data = json.load(package_file)
                folder_name = package_data.get('name', f'default_name_{uuid.uuid4()}')

            # Create a folder with the "name" property and move contents
            target_folder = os.path.join(os.getcwd(), folder_name)
            os.makedirs(target_folder, exist_ok=True)

            # Move all files from temp to the target folder except specified ones
            for root, dirs, files in os.walk(temp_dir):
                for file in files:
                    if file not in ['package.json', 'sandbox.config.json']:
                        file_path = os.path.join(root, file)
                        os.rename(file_path, os.path.join(target_folder, file))

            # Clean up temporary directory
            for root, dirs, files in os.walk(temp_dir, topdown=False):
                for name in files:
                    os.remove(os.path.join(root, name))
                for name in dirs:
                    os.rmdir(os.path.join(root, name))
            os.rmdir(temp_dir)

    return "Processing completed."

# Run the function
process_zip_files()
