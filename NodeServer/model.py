import sys
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler , Normalizer
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from scipy.stats import norm
from scipy import stats
from sklearn import metrics
import warnings
warnings.filterwarnings('ignore')
#%matplotlib inline
#from keras.models import Sequential
import pickle
import json 

#from sklearn.externals import joblib
import joblib
df = pd.read_csv("C:/Users/ali/Desktop/MarvinBot/IA_Model/covid.csv")

pd.pandas.set_option('display.max_columns',None)
#display("Peeking into Data", df)
#display("Shape of dataset")
#print("Rows:",df.shape[0],"\nColumns:",df.shape[1])
#display("Description",df.describe())
#df.info() 
severity_columns = df.filter(like='Severity_').columns
df['Severity_None'].replace({1:'None',0:'No'},inplace =True)
df['Severity_Mild'].replace({1:'Mild',0:'No'},inplace =True)
df['Severity_Moderate'].replace({1:'Moderate',0:'No'},inplace =True)
df['Severity_Severe'].replace({1:'Severe',0:'No'},inplace =True)
df['Condition']=df[severity_columns].values.tolist()
def removing(list1):
    list1 = set(list1) 
    list1.discard("No")
    a = ''.join(list1)
    return a
df['Condition'] = df['Condition'].apply(removing)

age_columns = df.filter(like='Age_').columns
gender_columns = df.filter(like='Gender_').columns
contact_columns = df.filter(like='Contact_').columns
No_risk_age = df.groupby(['Severity_None'])[age_columns].sum()
No_risk_gender = df.groupby(['Severity_None'])[gender_columns].sum()
No_risk_contact = df.groupby(['Severity_None'])[contact_columns].sum()
Low_risk_age = df.groupby(['Severity_Mild'])[age_columns].sum()
Low_risk_gender = df.groupby(['Severity_Mild'])[gender_columns].sum()
Low_risk_contact = df.groupby(['Severity_Mild'])[contact_columns].sum()
Moderate_risk_age = df.groupby(['Severity_Moderate'])[age_columns].sum()
Moderate_risk_gender = df.groupby(['Severity_Moderate'])[gender_columns].sum()
Moderate_risk_contact = df.groupby(['Severity_Moderate'])[contact_columns].sum()
Severe_risk_age = df.groupby(['Severity_Severe'])[age_columns].sum()
Severe_risk_gender = df.groupby(['Severity_Severe'])[gender_columns].sum()
Severe_risk_contact = df.groupby(['Severity_Severe'])[contact_columns].sum()

sns.countplot(df['Condition'])

df.drop(severity_columns,axis=1,inplace=True)
df['Symptoms_Score'] = df.iloc[:,:5].sum(axis=1) + df.iloc[:,6:10].sum(axis=1)
df.shape
from sklearn import preprocessing
le = preprocessing.LabelEncoder()
df['Condition'] = le.fit_transform(df['Condition'])
df

X= df.drop(['Condition'],axis=1)
y= df['Condition']

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)

from sklearn.linear_model import LogisticRegression
#from keras.models import model_from_json
model = LogisticRegression(solver = 'lbfgs')
model.fit(X_train, y_train)

# serialize model to JSON
#model_json = model.to_json()
#with open("model.json", "w") as json_file:
 #   json_file.write(model_json)
# serialize weights to HDF5
#model.save_weights("model.h5")
#print("Saved model to disk")

# load json and create model
#json_file = open('model_num.json', 'r')

#loaded_model_json = json_file.read()
#json_file.close()
#loaded_model = model_from_json(loaded_model_json)

# load weights into new model
#loaded_model.load_weights("model_num.h5")
#print("Loaded model from disk")

#loaded_model.save('model_num.hdf5')
#loaded_model=load_model('model_num.hdf5')

Pkl_Filename = "Pickle_RL_Model.pkl"  

with open(Pkl_Filename, 'wb') as file:  
    pickle.dump(model, file)

with open(Pkl_Filename, 'rb') as file:  
    Pickled_model = pickle.load(file)

Pickled_model
score = Pickled_model.score(X_train, y_train)
#print("Test score: {0:.2f} %".format(100 * score))  
Ypredict = Pickled_model.predict(X_test)  

Ypredict

# Save RL_Model to file in the current working directory

joblib_file = "joblib_model.pkl"  
joblib.dump(model, joblib_file)
joblib_model = joblib.load(joblib_file)


joblib_model

# Calculate the accuracy score and predict target values

# Calculate the Score 
score = joblib_model.score(X_test, y_test)  
# Print the Score
#print("Test score: {0:.2f} %".format(100 * score))  

# Predict the Labels using the reloaded Model
Ypredict = joblib_model.predict(X_test)  

Ypredict

class MyLogReg(LogisticRegression):

    # Override the class constructor
    def __init__(self, C=1.0, solver='lbfgs', max_iter=100, X_train=None, y_train=None):
        LogisticRegression.__init__(self, C=C, solver=solver, max_iter=max_iter)
        self.X_train = X_train
        self.y_train = y_train

    # A method for saving object data to JSON file
    def save_json(self, filepath):
        dict_ = {}
        dict_['C'] = self.C
        dict_['max_iter'] = self.max_iter
        dict_['solver'] = self.solver
        dict_['X_train'] = self.X_train.tolist() if self.X_train is not None else 'None'
        dict_['y_train'] = self.y_train.tolist() if self.y_train is not None else 'None'

        # Creat json and save to file
        json_txt = json.dumps(dict_, indent=4)
        with open(filepath, 'w') as file:
            file.write(json_txt)

    # A method for loading data from JSON file
    def load_json(self, filepath):
        with open(filepath, 'r') as file:
            dict_ = json.load(file)

        self.C = dict_['C']
        self.max_iter = dict_['max_iter']
        self.solver = dict_['solver']
        self.X_train = np.asarray(dict_['X_train']) if dict_['X_train'] != 'None' else None
        self.y_train = np.asarray(dict_['y_train']) if dict_['y_train'] != 'None' else None
filepath = "mylogreg.json"

# Create a model and train it
mylogreg = MyLogReg(X_train=y_train, y_train=y_train)  
mylogreg.save_json(filepath)

# Create a new object and load its data from JSON file
json_mylogreg = MyLogReg()  
json_mylogreg.load_json(filepath)  
json_mylogreg  

# use the model to make predictions with the test data
y_pred = model.predict(X_test)

from sklearn.metrics import accuracy_score
round(accuracy_score(y_test,y_pred)*350,2)

#Xnew = [[1,1,1,1,1,0,1,1,1,1,0,1,0,0,0,0,0,1,0,1,0,0,0]]

Xnew=sys.argv[1]
Xnew= np.fromstring( Xnew, dtype=np.float,sep=',' )
#print (Xnew)       
Xnew = Xnew.reshape(1, -1)
# make a prediction
ynew = model.predict(Xnew)
print("X=%s, Predicted=%s" % (Xnew[0], ynew[0]))
