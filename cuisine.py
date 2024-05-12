import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
import pickle

recipe = pd.read_json('recipe_data/train.json')

# all ingredients
all_ingredients = set()
for ingredients in recipe['ingredients']:
    all_ingredients = all_ingredients | set(ingredients)
len(all_ingredients)

# avg number of ingredients per recipe
total_ingredients = 0
for ingredients in recipe['ingredients']:
    total_ingredients += len(ingredients)
average_ingredients = total_ingredients / len(recipe)
average_ingredients

vocabulary = {}
for ingredient, i in zip(all_ingredients, range(len(all_ingredients))):
    vocabulary[ingredient] = i

cuisine_classifier = Pipeline([
    ('vect', CountVectorizer(vocabulary=vocabulary)),
    ('tfidf', TfidfTransformer()),
    ('clf', SGDClassifier()),
])

cuisine_classifier.fit(recipe['ingredients'].apply(lambda x:  ' '.join(x)), recipe['cuisine'])
print(cuisine_classifier.score(recipe['ingredients'].apply(lambda x:  ' '.join(x)), recipe['cuisine']))

df_test = pd.read_json('recipe_data/test.json')

print(cuisine_classifier.predict(df_test['ingredients'].apply(lambda x:  ' '.join(x))))

pickle.dump(cuisine_classifier, open('cuisine.pk', 'wb'))

#with open("cuisine.pk", "rb") as f:
#        test = pickle.load(f)
#y_val_pred = test.predict(X_val_vectorized)
#accuracy_val = accuracy_score(y_val, y_val_pred)
#print(f"Validation Accuracy: {accuracy_val:.2f}")