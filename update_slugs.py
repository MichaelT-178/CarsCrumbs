import json
import re

# --------- CONFIG ---------
FILES = {
    "menu": "src/assets/new_data/menu.json",
    "reviews": "src/assets/new_data/reviews.json",
    "user_info": "src/assets/new_data/user_info.json",
    "old_menu": "src/assets/old_data/real_menu/MenuItems.json",
    "test_menu": "src/assets/old_data/test_menu/MenuItems.json",
}

# --------- HELPERS ---------
def to_slug(text: str) -> str:
    text = text.replace("_", " ")
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"\s+", "-", text)
    return text.strip("-")


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


# --------- BUILD GLOBAL SLUG MAP ---------
def build_slug_map(menu_items):
    slug_map = {}
    for item in menu_items:
        original = item.get("Name")
        if original:
            slug_map[original] = to_slug(original)
    return slug_map


# --------- TRANSFORMS ---------
def update_menu(menu, slug_map):
    for item in menu.get("MenuItems", []):
        original = item.get("Name")
        if not original:
            continue

        slug = slug_map.get(original, to_slug(original))

        item["Name"] = slug
        item["Route"] = f"/item/{slug}"

    return menu


def update_reviews(reviews, slug_map):
    for entry in reviews.get("reviews", []):
        name = entry.get("item_name")
        if name in slug_map:
            entry["item_name"] = slug_map[name]

    return reviews


def update_user_info(user_info, slug_map):
    # Favorites
    for fav in user_info.get("Favorites", []):
        item = fav.get("item", {})
        name = item.get("name")

        if name in slug_map:
            slug = slug_map[name]
            item["name"] = slug
            item["route"] = f"/item/{slug}"

    # Reviews
    for review in user_info.get("Reviews", []):
        name = review.get("item_name")
        if name in slug_map:
            review["item_name"] = slug_map[name]

    return user_info


def update_old_menu(menu):
    for item in menu.get("MenuItems", []):
        original = item.get("Name")
        if not original:
            continue

        slug = to_slug(original)
        item["Name"] = slug
        item["Route"] = f"/item/{slug}"

    return menu


# --------- MAIN ---------
def main():
    # Load main menu first (source of truth)
    new_menu = load_json(FILES["menu"])

    # Build slug map from NEW menu
    slug_map = build_slug_map(new_menu.get("MenuItems", []))

    # Load other files
    reviews = load_json(FILES["reviews"])
    user_info = load_json(FILES["user_info"])
    old_menu = load_json(FILES["old_menu"])
    test_menu = load_json(FILES["test_menu"])

    # Apply transformations
    new_menu = update_menu(new_menu, slug_map)
    reviews = update_reviews(reviews, slug_map)
    user_info = update_user_info(user_info, slug_map)
    old_menu = update_old_menu(old_menu)
    test_menu = update_old_menu(test_menu)

    # Save everything (emoji-safe)
    save_json(FILES["menu"], new_menu)
    save_json(FILES["reviews"], reviews)
    save_json(FILES["user_info"], user_info)
    save_json(FILES["old_menu"], old_menu)
    save_json(FILES["test_menu"], test_menu)

    print("✅ Slugs updated across all files (emojis preserved).")


if __name__ == "__main__":
    main()