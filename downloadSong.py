import os, subprocess

songData_path = 'songData.txt'
state_file_path = 'state.txt'
script_directory = os.path.dirname(os.path.abspath(__file__))

if not os.path.exists('songs'):
    os.makedirs('songs')
folder_path = os.path.join(script_directory, 'songs')

try:
    with open(state_file_path, 'r') as state_file:
        offset = int(state_file.read().strip())
except FileNotFoundError:
    offset = 0

with open(songData_path, 'r') as file:
    file.seek(offset)
    artist = file.readline().strip()
    title = file.readline().strip()
    offset = file.tell()

    file.seek(0, 2)
    total_size = file.tell()

    subprocess.run(['yt-dlp', '-x', '--audio-format', 'mp3', '--output', f'{folder_path}/{artist} - {title}',f'ytsearch1:{artist} {title}'])


if offset != total_size:
    with open(state_file_path, 'w') as state_file:
        state_file.write(str(offset))
else:
    try:
        os.remove(state_file_path)
    except FileNotFoundError:
        pass
