
# Vending machine items using a list: [code, name, price, category, stock]
items = [
    ["A1", "Coca Cola", 2.0, "Drinks", 0],
    ["A2", "Pepsi", 2.0, "Drinks", 10],
    ["A3", "Fanta", 2.0, "Drinks", 10],
    ["A4", "Mountain Dew", 2.0, "Drinks", 10],
    ["B1", "Ferrero Rocher", 1.5, "Chocolate", 10],
    ["B2", "Patchi", 2.0, "Chocolate", 10],
    ["B3", "Toblerone", 1.5, "chocolate", 10],
    ["B4", "Special Dubai chocolate", 8.18, "chocolate", 10],
    ["C1", "Cappuccino", 5.0, "Coffee", 10],
    ["C2", "Espresso", 1.5, "Coffee", 15],
    ["C3", "Americano", 3.0, "Coffee", 15],
    ["D1", "Biscuits", 1.5, "Snacks", 10],
    ["D2", "Lays", 1.5, "Snacks", 15],
    ["D3", "Doritos", 3.0, "Snacks", 15],
    ["D4", "Croissant", 2.0, "Snacks", 15],
    ["E1", "Mineral Water", 1.0, "Water", 20],
    ["E2", "Sparkling Water", 1.5, "Water", 15],
    ["E3", "Detox Water", 3.0, "Water", 10],
    ["F1", "Strawberry Juice", 2.0, "Juice", 10],
    ["F2", "Mango Juice", 1.5, "Juice", 10],
    ["F3", "Mix fruit Juice", 2.0, "Juice", 10],
    ["T1", "karak tea", 1.0, "Tea", 10],
    ["T2", "Masala tea", 1.0, "Tea", 10],
    ["T3", "Milk tea", 1.0, "Tea", 10],
    ["T4", "Cardamom tea", 1.0, "Tea", 10],

]

def show_menu():
    print("\n=== VENDING MACHINE MENU ===")
    for item in items:
        print(f"{item[0]} - {item[1]} (£ {item[2]}) - {item[4]} left")

def find_item(code):
    for item in items:
        if item[0] == code:
            return item
    return None

def suggest_item(code):
    if code == "C1":
        print(" You might also like: Biscuits (Code: C2)")

def vending_machine():
    while True:
        show_menu()
        code = input("\nEnter the item code (or type 'exit' to finish): ").upper()
        if code == "EXIT":
            break
        item = find_item(code)
        if not item:
            print(" Invalid code. Please try again.")
            continue
        if item[4] <= 0:
            print(" Sorry, this item is out of stock.")
            continue
        try:
            money = float(input(f"Insert money (${item[2]} required): $"))
        except ValueError:
            print(" Invalid input. Please insert valid money.")
            continue
        if money < item[2]:
            print(" Not enough money inserted.")
            continue
        change = round(money - item[2], 2)
        item[4] -= 1  # Reduce stock
        print(f" Dispensing {item[1]}... Enjoy!")
        print(f" Change returned: ${change}")
        suggest_item(code)
        another = input("\nWould you like to buy another item? (yes/no): ").lower()
        if another != "yes":
            break
    print("Thank you for using the Vending Machine! 😊")
vending_machine()
