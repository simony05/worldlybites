from flask import Flask, jsonify, request
from rec import rec_api
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import tempfile
import base64

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
def upload_image():
    image_base64 = request.form['image']
    image_bytes = base64.b64decode(image_base64)
    temp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
    temp_file.write(image_bytes)
    temp_file.seek(0)
    img = cv2.imread(temp_file.name)
    # Load the exported ONNX model
    onnx_model = YOLO("best.onnx")
    # Run inference
    results = onnx_model(img)
    # results in a list
    class_names = set()
    for result in results:
        for box in result.boxes:
            class_id = int(box.cls)
            class_name = onnx_model.names[class_id]
            class_names.add(class_name)

    return jsonify({'ingredients': list(class_names)})

if __name__ == "__main__":
   # lets api run on any ip address and port 8081
   app.run(host='0.0.0.0', port=5000)
       #host='0.0.0.0', port=8081
