from ultralytics import YOLO
import cv2

# Load the exported ONNX model
onnx_model = YOLO("best.onnx")

img = cv2.imread("apple.jpeg")
# Run inference
results = onnx_model(img)

class_names = []
for result in results:
    for box in result.boxes:
        class_id = int(box.cls)
        class_name = onnx_model.names[class_id]
        class_names.append(class_name)

print(class_names)