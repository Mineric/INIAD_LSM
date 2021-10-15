# INIAD_LSM
# Workflow
The project mainly contains 2 branches: `main` and `dev`:
* `main` branch: a stable branch
* `dev` branchl: development branch

The **workflow** is: 
1. Take up an issue
2.  If it is an issue which adds a features, create a new branch `features/xxx` which 'xxx' is the name of the feature. Else if it is a bug fixed issue, create a new branch name `bugs/xxx` where 'xxx' is the name of the feature you fix. (About how to create a branch, read `Git` part) For example, if you do the CSS of the introduction page, create a new branch `features/intro_css` and work on that.
3.  Develop on the branch you created. When you are done, create a pull request to the branch `dev`, and I will review it before officially merging it to the `dev` branch.


NOTE: when `commit` on git, make sure to write meaningful commit. For example, `Add xxx`, `Update xxx css`, `Update database model`, `Fix xxx bugs of yyy` where 'xxx' can be the features and 'yyy' is the bug you fixed. In `Update` and `Fix` case, if the number of files you change is not too many, write that in the commit.

# Git
*Feel free to use GitHub Desktop*.
I recommend reading the first 3 chapters of https://git-scm.com/book/en/v2. I will list some basic command here.
To see status (which files is tracked, added etc.):
```
git status
```
To add files for commit:
```
git add filename
```
To add all files for commits:
```
git add .
```
To commit:
```
git commit -m "Your commit message here"
```
To fetch and to pull:
```
git fetch
git pull
```
To create new branch named `features/intro_css`:
```
git checkout -b features/intro_css
```
To switch to a branch:
```
git branch features/intro_css
```
To delete a bracnh:
```
git branch -d features/intro_css
```

# Django basics
To create a new app named 'foo' and start:
```
python manage.py startapp foo
```
To make migrations and migrate:
```
python manage.py makemigrations 
python manage.py migrate
```
To run server locally:
```
python manage.py runserver
```

# Virtual Environment
Create a virtual environment:
```
python -m venv venv
```
The second `venv` is the name of the virtual environment. It can be anything you want.

Activate a virtual environment:
```
source venv/bin/activate
```

# Pip
To install some modules:
```
pip install django # for example
```
To install dependencies:
```
pip install -r requirement.txt
```
To write or update dependencies:
```
pip freeze >> requirement.txt
```
