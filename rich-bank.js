const accounts = [
	{id: 1, owner: "Alice", balance: 500},
	{id: 2, owner: "Bob", balance: 300}
];

function getAccountById (id)
{
	if (!Number.isInteger(id) || id <= 0) // Check if ID is a positive integer
		{
			throw new Error("Invalid value for account ID: The ID must be a positive integer.");
		}
	for (const account of accounts)
	{
		if (account.id === id) // Added "===" to check if account ID is exactly equal to the given ID
		{
			return account;
		}
	}
}

function createAccount (newAccountId, newAccountOwner)
{
	const account = getAccountById(newAccountId); // Created constant for account

	if (account) // Check if account already exists
	{
		throw new Error("Account already exists.");
	}

	if (!Number.isInteger(newAccountId) || newAccountId <= 0) // Check if account ID is a positive integer
	{
		throw new Error("Invalid value for account ID: The ID must be a positive integer.");
	}

	if (typeof newAccountOwner !== "string" || newAccountOwner.trim() === "") // Check if account owner is a non-empty string
	{
		throw new Error("Invalid value for account owner: The owner must be a non-empty string.");
	}

	accounts.push( // Add new account to accounts array
		{
			id: newAccountId,
			owner: newAccountOwner,
			balance: 0 // Changed from string to number
		}
	);
}

function depositMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account) // Check if account exists
	{
		throw new Error("Account not found");
	}

	if (!Number.isFinite(amount) || amount <= 0) // Check if amount is a positive finite number
	{
		throw new Error("Invalid value for deposit amount: The amount must be a positive finite number.");
	}

	account.balance += amount;
}

function withdrawMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account) // Check if account exists
	{
		throw new Error("Account not found.");
	}

	if (!Number.isFinite(amount) || amount <= 0) // added "|| amount <=" to check if amount is a positive finite number
	{
		throw new Error("Invalid value for withdrawal amount: The amount must be a positive finite number.");
	}
	
	if (amount > account.balance) // Check if amount is greater than account balance
	{
		throw new Error("Insufficient funds.");
	}

	account.balance -= amount;
}

function transferMoney (fromAccountId, toAccountId, amount)
{
	const fromAccount = getAccountById(fromAccountId);
	const toAccount = getAccountById(toAccountId);

	if (!fromAccount)
	{
		throw new Error("Source account not found.");
	}

	if (!toAccount)  // Added check for destination account
	{
		throw new Error("Destination account not found.");
	}

	if (!Number.isFinite(amount) || amount <= 0) // Added "<= 0" because you cannot transfer 0 or negative amount
	{
		throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
	}

	if (amount > fromAccount.balance) // Check if amount is greater than source account balance
	{
		throw new Error("Insufficient funds in source account.");
	}

	toAccount.balance += amount;
	fromAccount.balance -= amount; // Added to deduct amount from source account
}

/*
Hints:

getAccountById("1");

createAccount(1, "Alice");
createAccount("3", "Charlie");
createAccount(-3, "Charlie");
createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");

depositMoney(1, "300")
depositMoney(1, -300)
depositMoney(1, 0)
depositMoney(1, Infinity)
depositMoney(4, 100)

withdrawMoney(1, -100)
withdrawMoney(1, 0)
withdrawMoney(1, 501)

transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);
*/
