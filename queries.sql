-- all columns and all rows from the customers table
SELECT * FROM customers;

-- we can pick the columns that we want to see
SELECT CustomerID, CustomerName, Country, City
FROM Customers;

-- we can pick specific queries, such as Country
SELECT CustomerID, CustomerName, Country, City
FROM Customers
WHERE Country = "Germany";

-- sorting
SELECT CustomerID, CustomerName, Country, City
FROM Customers
ORDER BY Country, City;

-- descending by country and ascending (the default) by city
SELECT CustomerID, CustomerName, Country, City
FROM Customers
ORDER BY Country DESC, City

-- controlling how many records to return
SELECT *
FROM Products
LIMIT 5

-- pagination
SELECT *
FROM Products
ORDER BY ProductID
LIMIT 5
OFFSET 10
-- OFFSET will skip the first 10, then return 5 from there.

-- adding records
INSERT INTO products (ProductName, SupplierID, CategoryID, Unit, Price)
VALUES ('Cake', 7, 1, 'One', 20.99);

-- partial lookup - if it has the name in it somewhere:
SELECT * FROM [Products]
WHERE ProductName like "%Cake%";
-- could be '%cake' or 'cake%', too.
-- you use like and then %these% don't 'care' what comes before or after, just so long it contains the word cake in the product name


-- updating records - ALWAYS HAVE A *WHERE*
UPDATE products
SET price = 24.99
WHERE ProductID = 79;

-- updating multiple columns, seperate by commas!
UPDATE products
SET price = 24.99, unit = 'whole cake'
WHERE ProductID = 79;

-- removing records - ALWAYS HAVE A *WHERE*

DELETE FROM Products
WHERE ProductID = 80;