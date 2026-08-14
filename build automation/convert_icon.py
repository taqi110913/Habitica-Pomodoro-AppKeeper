from PIL import Image

# Open the PNG image
img = Image.open('dist/win_x64/icon.png')

# Convert and save as ICO
img.save('icon.ico', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64), (128,128), (256,256)])