import os, shutil

script_directory = os.path.dirname(os.path.abspath(__file__))
songFolderPath = os.path.join(script_directory, 'songs')

if os.path.exists(songFolderPath):
    zipFilePath = os.path.join(script_directory, 'Playlist')
    shutil.make_archive(zipFilePath, 'zip', 'songs')

