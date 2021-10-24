"""
Django settings for app project.

Generated by 'django-admin startproject' using Django 3.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os 
from drf_firebase_auth.utils import map_firebase_uid_to_username

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-^0xxj0kdcr&3m2-dik%5mom4!&^dd8i&vf=^t4$g1=!6+j1*8#'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Application definition

INSTALLED_APPS = [
    'drf_firebase_auth',
    'corsheaders',
    'api',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'app.wsgi.application'

CORS_ORIGIN_ALLOW_ALL = True   

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

AUTH_USER_MODEL = 'api.ExpandedUser'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

KEYFILES_DIR = os.path.join(BASE_DIR, 'keyfiles')
FIREBASE_KEY = 'iniad-lsm-firebase-adminsdk-mqv7a-02a4c53f89.json'
FIREBASE_PATH = os.path.join(KEYFILES_DIR, FIREBASE_KEY)

REST_FRAMEWORK = {
  'DEFAULT_AUTHENTICATION_CLASSES': [
    'rest_framework.authentication.SessionAuthentication',
    'drf_firebase_auth.authentication.FirebaseAuthentication',
  ]
}

DRF_FIREBASE_AUTH = {
    # allow anonymous requests without Authorization header set
    'ALLOW_ANONYMOUS_REQUESTS': os.getenv('ALLOW_ANONYMOUS_REQUESTS', False),
    # path to JSON file with firebase secrets
    'FIREBASE_SERVICE_ACCOUNT_KEY':
        os.getenv('FIREBASE_SERVICE_ACCOUNT_KEY', FIREBASE_PATH),
    # allow creation of new local user in db
    'FIREBASE_CREATE_LOCAL_USER':
        os.getenv('FIREBASE_CREATE_LOCAL_USER', True),
    # attempt to split firebase user.display_name and set local user
    # first_name and last_name
    'FIREBASE_ATTEMPT_CREATE_WITH_DISPLAY_NAME':
        os.getenv('FIREBASE_ATTEMPT_CREATE_WITH_DISPLAY_NAME', True),
    # commonly JWT or Bearer (e.g. JWT <token>)
    'FIREBASE_AUTH_HEADER_PREFIX':
        os.getenv('FIREBASE_AUTH_HEADER_PREFIX', 'JWT'),
    # verify that JWT has not been revoked
    'FIREBASE_CHECK_JWT_REVOKED':
        os.getenv('FIREBASE_CHECK_JWT_REVOKED', True),
    # require that firebase user.email_verified is True
    'FIREBASE_AUTH_EMAIL_VERIFICATION':
        os.getenv('FIREBASE_AUTH_EMAIL_VERIFICATION', False),
    # function should accept firebase_admin.auth.UserRecord as argument
    # and return str
    'FIREBASE_USERNAME_MAPPING_FUNC': map_firebase_uid_to_username
}

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
