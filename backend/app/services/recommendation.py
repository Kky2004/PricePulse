def get_best_deal(prices):

    if not prices:
        return None

    return min(
        prices,
        key=lambda p: p["price"]
    )