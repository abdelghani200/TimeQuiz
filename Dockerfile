FROM node:16

# Définissez le répertoire de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copiez les fichiers nécessaires dans le conteneur
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers dans le conteneur
COPY . .

# Exposez le port sur lequel votre application Angular s'exécute (par défaut : 4200)
EXPOSE 4400

# Commande de démarrage de l'application
CMD ["npm", "start"]
