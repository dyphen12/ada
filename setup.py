import pathlib
from setuptools import setup
from setuptools import find_packages, setup

# The directory containing this file
HERE = pathlib.Path(__file__).parent

# The text of the README file
README = (HERE / "README.md").read_text()

# This call to setup() does all the work
setup(
    name="adaforecasts",
    version="1.3.3",
    description="Get the forecast of the stock of your choice.",
    long_description=README,
    long_description_content_type="text/markdown",
    url="https://github.com/dyphen12/ada",
    author="Alexis Wong",
    author_email="alexiswong10@gmail.com",
    license="MIT",
    classifiers=[
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
    ],
    packages=find_packages(),
    package_data={'core': ['*.h5', 'ada/core/*.h5']},
    include_package_data=True,
    entry_points={
        "console_scripts": [
            "ada=__main__:main",
        ]
    },
)