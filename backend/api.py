from flask import Flask, jsonify, request
from rec import rec_api
from flask_cors import CORS
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)


# test: /recipe?ingredients= pasta tomato onion
@app.route('/recipe', methods=["GET"])
def recommend_recipe():
    # This is our endpoint.
    ingredients = request.args.get('ingredients')
    recipe = rec_api(ingredients)
    
    # We need to turn output into JSON. 
    response = {}
    count = 0    
    for index, row in recipe.iterrows():
        response[count] = {
                            'title': str(row['Title']),
                            'ingredients': str(row['Ingredients']),
                            'instructions': str(row['Instructions']),
                            'image': row["Image_Name"],
                            'cuisine': str(row['Cuisine']),
                          }
        count += 1
    return jsonify(response)

@app.route('/camera', methods=['POST'])
def camera():
    img = request.files['image']
    #img = Image.open(img)
    #array = np.array(img)
    return jsonify({ 'message': 'Image uploaded successfully'})
    #return jsonify({'array': array.tolist()}), 200

if __name__ == "__main__":
   # lets api run on any ip address and port 8081
   app.run(host='0.0.0.0', port=5000)
       #host='0.0.0.0', port=8081
