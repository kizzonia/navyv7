class AddAcctypeToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :account_type, :string
    add_column :accounts, :lbalance, :string

  end
end
