import pathlib
from setuptools import setup

# The directory containing this file
HERE = pathlib.Path(__file__).parent

# The text of the README file
README = (HERE / "README.md").read_text()

# This call to setup() does all the work
setup(
    name="adaforecasts",
    version="1.2.1",
    description="Get the forecast of the stock of your choice.",
    long_description=README,
    long_description_content_type="text/markdown",
    url="https://github.com/dyphen12/ada",
    author="Alexis Wong",
    author_email="prismasolutions1@gmail.com",
    license="MIT",
    classifiers=[
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
    ],
    packages=["core","analysis"],
    include_package_data=True,
    install_requires=["Flask", "Flask-Cors","Flask-RESTful","h5py","numpy","PyYAML","requests","sklearn","tensorflow","Werkzeug","yfinance","gunicorn"],
    entry_points={
        "console_scripts": [
            "ada=analysis.forecasts:main",
        ]
    },
)