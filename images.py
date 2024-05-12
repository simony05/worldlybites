import pandas as pd
import base64
data = pd.read_csv("parsed_recipes.csv")
name = data.iloc[9999]['Image_Name']
print(data.iloc[9999])

from PIL import Image 
im = Image.open(f'recipe_data/Food Images/Food Images/{name}.jpg') 
im.show()

with open(f'recipe_data/Food Images/Food Images/{name}.jpg', "rb") as image_file:
    image_data = image_file.read()
print(base64.b64encode(image_data).decode())

import ast
for item in ast.literal_eval(data.iloc[9999]['Parsed_Ingredients']):
    print(item)