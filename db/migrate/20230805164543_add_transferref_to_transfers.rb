class AddTransferrefToTransfers < ActiveRecord::Migration[6.1]
  def change
    add_column :transfers, :tref, :string
  end
end
