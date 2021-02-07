class Account {
    constructor(username) {
        this.username = username;
        this.transactions = [];
    }

    get balance() {
        if (this.transactions.length === 0) return 0;
        return this.transactions.reduce( (a , b) => a + b.value, 0);
    }

    addTransaction(transaction) {
      if (this.commit()) return this.transactions.push(transaction);
    }
}

class Transaction {
    constructor(amount, account) {
      this.amount = amount;
      this.account = account;
    }

    isAllowed() {
        // if (this.value < 0 && this.account.balance <= 0) {
        //     return false;
        // }
        // return true;
        // !better way
        return this.account.balance - this.amount >= 0;
      }

    commit() {
      if (!this.isAllowed()) {
          console.log(`Transaction failed! You don't have enough money!`);
          return false;
      } else {
          this.time = new Date();
          this.account.addTransaction(this);
          return true;
      }

    }
}

class Withdrawal extends Transaction {
    get value() {
        return -this.amount;
    }
}

class Deposit extends Transaction {
    get value() {
        return this.amount;
    }
}

const myAccount = new Account('snow-patrol');

t1 = new Withdrawal (50.25, myAccount);
t1.commit();
console.log('Transaction 1: ', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2: ', t2);

t3 = new Deposit(120.0, myAccount);
t3.commit();
console.log('Transaction 3: ', t3);

console.log("myAccount balance: ", myAccount.balance);
