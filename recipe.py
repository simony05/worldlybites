import pandas as pd
import nltk
import nltk.corpus as corpus
import string
import ast
import re
import unidecode
#nltk.download('wordnet')
#nltk.download('stopwords')
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle

df = pd.read_csv("recipe_data/recipes.csv")

def ingredient_parser(ingredients):
    measures = [
        "teaspoon", "t", "tsp.", "tablespoon", "T", "tbl.", "tb", "tbsp.", "fluid ounce", "fl oz", "gill", "cup", "c",
        "pint", "p", "pt", "fl pt", "quart", "q", "qt", "fl qt", "gallon", "g", "gal", "ml", "milliliter", "millilitre",
        "cc", "mL", "l", "liter", "litre", "L", "dl", "deciliter", "decilitre", "dL", "bulb", "level", "heaped", "rounded",
        "whole", "pinch", "medium", "slice", "pound", "lb", "#", "ounce", "oz", "mg", "milligram", "milligramme",
        "g", "gram", "gramme", "kg", "kilogram", "kilogramme", "x", "of", "mm", "millimetre", "millimeter", "cm",
        "centimeter", "centimetre", "m", "meter", "metre", "inch", "in", "milli", "centi", "deci", "hecto", "kilo",
        'l', 'dl', 'milliliter', 'liter', 'deciliter', 'teaspoon', 't.', 'tsp.', 'milliliters', 'liters', 'deciliters',
        'teaspoons', 't.', 'tsp.', 'tablespoon', 'T.', 'tbsp.', 'ounce', 'fl oz', 'cup', 'c.', 'pint', 'pt.', 'tablespoons',
        'ounces', 'fl ozs', 'cups', 'pints', 'quarts', 'gallons', 'grams', 'kilograms', 'quart', 'qt.', 'gallon',
        'gal', 'mg', 'milligram', 'g', 'gram', 'kg', 'kilogram', 'milligrams', 'pound', 'lb', 'ounce', 'oz', 'count',
        'pints', 'quarts', 'cups', 'tablespoons', 'pounds', 'lbs', 'ounces', 'units', 'drops', 'tsps.', 'tbsps.', 'Ts.', 'ts.',
        'teaspoons', 'dash', 'pinch', 'drop', 'dram', 'smidgeon', 'dashes', 'pinches', 'drops', 'drams', 'smidgeons',
    ]
    words_to_remove = [
        "fresh", "minced", "chopped" "oil", "a", "red", "bunch", "and", "clove", "or", "leaf", "chilli", "large", "extra",
        "sprig", "ground", "handful", "free", "small", "pepper", "virgin", "range", "from", "dried", "sustainable", "black",
        "peeled", "higher", "welfare", "seed", "for", "finely", "freshly", "sea", "quality", "white", "ripe", "few", "piece",
        "source", "to", "organic", "flat", "smoked", "ginger", "sliced", "green", "picked", "the", "stick", "plain", "plus",
        "mixed", "mint", "bay", "basil", "your", "cumin", "optional", "fennel", "serve", "mustard", "unsalted", "baby",
        "paprika", "fat", "ask", "natural", "skin", "roughly", "into", "such", "cut", "good", "brown", "grated", "trimmed",
        "oregano", "powder", "yellow", "dusting", "knob", "frozen", "on", "deseeded", "low", "runny", "balsamic", "cooked",
        "streaky", "nutmeg", "sage", "rasher", "zest", "pin", "groundnut", "breadcrumb", "turmeric", "halved", "grating",
        "stalk", "light", "tinned", "dry", "soft", "rocket", "bone", "colour", "washed", "skinless", "leftover", "splash",
        "removed", "dijon", "thick", "big", "hot", "drained", "sized", "chestnut", "watercress", "fishmonger", "english",
        "dill", "caper", "raw", "worcestershire", "flake", "cider", "cayenne", "tbsp", "leg", "pine", "wild", "if", "fine",
        "herb", "almond", "shoulder", "cube", "dressing", "with", "chunk", "spice", "thumb", "garam", "new", "little", "punnet",
        "peppercorn", "shelled", "saffron", "other" "chopped", "salt", "olive", "taste", "can", "sauce", "water", "diced",
        "package", "italian", "shredded", "divided", "parsley", "vinegar", "all", "purpose", "crushed", "juice", "more",
        "coriander", "bell", "needed", "thinly", "boneless", "half", "thyme", "cubed", "cinnamon", "cilantro", "jar",
        "seasoning", "rosemary", "extract", "sweet", "baking", "beaten", "heavy", "seeded", "tin", "vanilla", "uncooked",
        "crumb", "style", "thin", "nut", "coarsely", "spring", "chili", "cornstarch", "strip", "cardamom", "rinsed", "honey",
        "cherry", "root", "quartered", "head", "softened", "container", "crumbled", "frying", "lean", "cooking", "roasted",
        "warm", "whipping", "thawed", "corn", "pitted", "sun", "kosher", "bite", "toasted", "lasagna", "split", "melted",
        "degree", "lengthwise", "romano", "packed", "pod", "anchovy", "rom", "prepared", "juiced", "fluid", "floret", "room",
        "active", "seasoned", "mix", "deveined", "lightly", "anise", "thai", "size", "unsweetened", "torn", "wedge", "sour",
        "basmati", "marinara", "dark", "temperature",  "garnish", "bouillon", "loaf", "shell", "reggiano", "canola",
        "parmigiano", "round", "canned", "ghee", "crust", "long", "broken", "ketchup", "bulk", "cleaned", "condensed",
        "sherry", "provolone", "cold", "soda", "cottage", "spray", "tamarind", "pecorino", "shortening", "part", "bottle",
        "sodium", "cocoa", "grain", "french", "roast", "stem", "link", "firm", "asafoetida", "mild", "dash", "boiling",
        "oil", "chopped", "vegetable oil", "chopped oil", "garlic", "skin off", "bone out", "from sustrainable sources",
        'diced', 'battered', 'blackened', 'blanched', 'blended', 'boiled', 'boned', 'braised', 'brewed', 'broiled',
        'browned', 'butterflied', 'candied', 'canned', 'caramelized', 'charred', 'chilled', 'chopped', 'clarified',
        'condensed', 'creamed', 'crystalized', 'curdled', 'cured', 'curried', 'dehydrated', 'deviled', 'diluted',
        'dredged', 'drenched', 'dried', 'drizzled', 'dry roasted', 'dusted', 'escalloped', 'evaporated', 'fermented',
        'filled', 'folded', 'freeze dried', 'fricaseed', 'fried', 'glazed', 'granulated', 'grated', 'griddled', 'grilled',
        'hardboiled', 'homogenized', 'kneaded', 'malted', 'mashed', 'minced', 'mixed', 'medium', 'small', 'large',
        'packed', 'pan-fried', 'parboiled', 'parched', 'pasteurized', 'peppered', 'pickled', 'powdered', 'preserved',
        'pulverized', 'pureed', 'redolent', 'reduced', 'refrigerated', 'chilled', 'roasted', 'rolled', 'salted',
        'saturated', 'scalded', 'scorched', 'scrambled', 'seared', 'seasoned', 'shredded', 'skimmed', 'sliced',
        'slivered', 'smothered', 'soaked', 'soft-boiled', 'hard-boiled', 'stewed', 'stuffed', 'toasted', 'whipped',
        'wilted', 'wrapped', 'baked', 'blanched', 'blackened', 'braised', 'breaded', 'broiled', 'caramelized', 'charred',
        'fermented', 'fried','glazed', 'infused', 'marinated', 'poached', 'roasted', 'sauteed', 'seared', 'smoked', 'whipped',
    ]
    # turn ingredient list from string into a list
    if isinstance(ingredients, list):
       ingredients = ingredients
    else:
        ingredients = ast.literal_eval(ingredients)
    # get rid of all the punctuation
    translator = str.maketrans('', '', string.punctuation)
    # initialize nltk's lemmatizer, returns base of words
    lemmatizer = WordNetLemmatizer()
    # list to store normalized ingredients
    ingredients_list = []
    for i in ingredients:
        i.translate(translator)
        # split up hyphens and spaces
        items = re.split(' |-', i)
        # remove words with non alphabet letters
        items = [word for word in items if word.isalpha()]
        # everything to lowercase
        items = [word.lower() for word in items]
        # remove accents
        items = [unidecode.unidecode(word) for word in items]
        # lemmatize words so we can compare words to measuring words
        items = [lemmatizer.lemmatize(word) for word in items]
        # remove stop words
        stop_words = set(corpus.stopwords.words('english'))
        items = [word for word in items if word not in stop_words]
        # remove measuring words/phrases
        items = [word for word in items if word not in measures]
        # remove common easy words
        items = [word for word in items if word not in words_to_remove]
        if items:
            if items:
              ingredients_list.append(' '.join(items))
    return ingredients_list

recipe_df = pd.read_csv("recipe_data/recipes.csv")
recipe_df['Parsed_Ingredients'] = recipe_df['Cleaned_Ingredients'].apply(lambda x: ingredient_parser(x))
df = recipe_df.dropna()
df.to_csv("parsed_recipes.csv", index=False)

# load in parsed recipe dataset
df_recipes = pd.read_csv("parsed_recipes.csv")

# Tfidf needs unicode or string types
df_recipes['Parsed_Ingredients'] = df_recipes.Parsed_Ingredients.values.astype('U')

# TF-IDF feature extractor
tfidf = TfidfVectorizer()
tfidf.fit(df_recipes['Parsed_Ingredients'])
tfidf_recipe = tfidf.transform(df_recipes['Parsed_Ingredients'])

# save the tfidf model and encodings
with open("model.pk", "wb") as f:
     pickle.dump(tfidf, f)
with open("encoding.pk", "wb") as f:
     pickle.dump(tfidf_recipe, f)

def cos_score(ingredients):
  # load in tdidf model and encodings
  with open("encoding.pk", 'rb') as f:
      tfidf_encodings = pickle.load(f)
  with open("model.pk", "rb") as f:
      tfidf = pickle.load(f)

  # parse the ingredients using my ingredient_parser
  try:
      ingredients_parsed = ingredient_parser(ingredients)
  except:
      ingredients_parsed = ingredient_parser([ingredients])

  # use our pretrained tfidf model to encode our input ingredients
  ingredients_tfidf = tfidf.transform(ingredients_parsed)

  # calculate cosine similarity between actual recipe ingreds and test ingreds
  cos_sim = map(lambda x: cosine_similarity(ingredients_tfidf, x), tfidf_encodings)
  scores = list(cos_sim)

  return scores

def get_recommendations(N, scores):
    # load in recipe dataset
    df_recipes = pd.read_csv("parsed_recipes.csv")

    # order the scores with and filter to get the highest N scores
    top = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:N]

    # create dataframe to load in recommendations
    recommendations = pd.DataFrame(columns = ['Title', 'Ingredients'])

    count = 0
    for i in top:
        recommendations.at[count, 'Title'] = df_recipes['Title'][i]
        recommendations.at[count, 'Ingredients'] = df_recipes['Cleaned_Ingredients'][i]
        #recommendations.at[count, 'Score'] = "{:.3f}".format(float(scores[i]))
        count += 1

    return recommendations

def get_recs(ingredients, N = 5):
    scores = cos_score(ingredients)
    recommendations = get_recommendations(N, scores)
    return recommendations

recs = get_recs("ground beef, pasta, spaghetti, tomato pasta sauce, bacon, onion, zucchini, cheese")
recs.head()