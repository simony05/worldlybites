from ultralytics import YOLO
import cv2

# Load the exported ONNX model
onnx_model = YOLO("best.onnx")

img = cv2.imread("apple.jpeg")
# Run inference
results = onnx_model(img)