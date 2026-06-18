def add_price_record(
    db,
    product_id,
    platform,
    price
):

    record = ProductPrice(
        product_id=product_id,
        platform=platform,
        price=price
    )

    db.add(record)
    db.commit()