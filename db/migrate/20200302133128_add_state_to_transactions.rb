class AddStateToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :bal_type, :string
  end
end
