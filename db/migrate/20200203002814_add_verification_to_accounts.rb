class AddVerificationToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :verified, :boolean
    add_column :accounts, :status, :boolean
  end
end
