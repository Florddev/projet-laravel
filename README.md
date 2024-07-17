# OnlyFun

## Installation

Dans un terminal WSL, clonner le repo et déplacez vous dedans:
```bash
git clone git@github.com:Florddev/projet-laravel.git
cd projet-laravel/
```

Puis installer les dépendances composer:
```bash
composer install
```

Si jamais des erreurs sont survenue à la commande précédente, faire les commandes:
```bash
sudo apt update
sudo apt upgrade -y
sudo apt install php-xml php-curl php-dom
php -m | grep -E 'dom|xml|curl'
composer install
```

Une fois les dépendences composer installés, démarrez Sail en exécutant la commande suivante:
```bash
./vendor/bin/sail up -d
```

Exécutez ensuite les migrations de la base de données pour configurer les tables nécessaires pour l'authentification

> [!IMPORTANT]  
> N'oubliez pas d'ajouter le fichier `.env` au source du projet avant d'effectuer la migration

```bash
./vendor/bin/sail artisan migrate
```

Enfin, compilez les assets front-end avec Laravel Mix. Pour cela, vous devrez installer les dépendances npm et exécuter la compilation :
```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

Et après, plus qu'a aller sur [localhost](http://localhost)
