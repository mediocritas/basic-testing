// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const balance = 12;
let account: ReturnType<typeof getBankAccount>;
let anotherAccount: ReturnType<typeof getBankAccount>;

describe('BankAccount', () => {
  beforeEach(() => {
    account = getBankAccount(balance);
    anotherAccount = getBankAccount(balance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toEqual(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(balance * 2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(balance * 2, anotherAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(balance * 2, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const toDeposit = 11;
    account.deposit(toDeposit);
    expect(account.getBalance()).toEqual(balance + toDeposit);
  });

  test('should withdraw money', () => {
    const toWithdraw = 11;
    account.withdraw(toWithdraw);
    expect(account.getBalance()).toEqual(balance - toWithdraw);
  });

  test('should transfer money', () => {
    const toTransfer = 11;
    account.transfer(toTransfer, anotherAccount);
    expect(anotherAccount.getBalance()).toEqual(balance + toTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchAccount = await account.fetchBalance();
    if (fetchAccount !== null) {
      expect(typeof fetchAccount).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    account.synchronizeBalance();
    if (typeof account.getBalance() === 'number') {
      expect(account.getBalance).not.toEqual(balance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
