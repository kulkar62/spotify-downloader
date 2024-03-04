import os, shutil

script_directory = os.path.dirname(os.path.abspath(__file__))

songFolderPath = os.path.join(script_directory, 'songs')
songDataPath = os.path.join(script_directory, 'songData.txt')
zipFilePath = os.path.join(script_directory, 'Playlist.zip')
stateFilePath = os.path.join(script_directory, 'state.txt')

if os.path.exists(songFolderPath):
    shutil.rmtree(songFolderPath)

if os.path.exists(songDataPath):
    os.remove(songDataPath)

if os.path.exists(zipFilePath):
    os.remove(zipFilePath)

if os.path.exists(stateFilePath):
    os.remove(stateFilePath)