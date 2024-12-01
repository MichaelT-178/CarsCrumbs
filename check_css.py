import os
import re
from collections import Counter
from termcolor import colored as c

"""
Finds unused or duplicate classes in CSS files within Vue.js files.
"""

def extract_classes_from_template(file_content):
    """Extracts class names from the template section."""
    class_regex = re.compile(r'class=["\']([^"\']+)["\']')
    return class_regex.findall(file_content)

def extract_classes_from_css(file_content):
    """Extracts class names from the style section."""
    css_regex = re.compile(r'\.([a-zA-Z0-9_-]+)\s*{')
    return css_regex.findall(file_content)

def analyze_vue_file(file_path):
    """Analyze a single .vue file for unused or duplicate CSS classes."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Extract classes from template and style sections
    template_classes = []
    css_classes = []
    in_template = False
    in_style = False

    for line in content.splitlines():
        if '<template>' in line:
            in_template = True
        elif '</template>' in line:
            in_template = False
        elif '<style' in line:
            in_style = True
        elif '</style>' in line:
            in_style = False

        if in_template:
            template_classes.extend(extract_classes_from_template(line))
        if in_style:
            css_classes.extend(extract_classes_from_css(line))
    
    used_classes = {cls for classes in template_classes for cls in classes.split()}
    defined_classes = set(css_classes)

    unused_classes = defined_classes - used_classes
    duplicate_classes = [cls for cls, count in Counter(css_classes).items() if count > 1]

    return unused_classes, duplicate_classes

def analyze_css(path):
    """Analyze all .vue files in the given directory."""
    file_names = [f for f in os.listdir(path) if f.endswith('.vue') and os.path.isfile(os.path.join(path, f))]
    for file_name in file_names:
        file_path = os.path.join(path, file_name)
        unused_classes, duplicate_classes = analyze_vue_file(file_path)
        # Only print if there are unused or duplicate classes
        if unused_classes or duplicate_classes:
            print(c(f"\nFile: {file_name}", "cyan"))
            if unused_classes:
                print(f"Unused Classes: {unused_classes}")
            if duplicate_classes:
                print(f"Duplicate Classes: {duplicate_classes}")

# Analyze specified directories
analyze_css("src/views")
analyze_css("src/components")
