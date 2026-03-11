class TransactionsController < InheritedResources::Base
  layout "accounts"
  before_action :authenticate_user!

  def index
    @transactions = Transaction.where(user_id: current_user).order('created_at DESC')
    @accounts = Account.where(user_id: current_user).order('created_at DESC')
    @transfers = Transfer.where(user_id: current_user).order('created_at DESC')


  end
  private

    def transaction_params
      params.require(:transaction).permit(:amount, :transac_type, :bal_type, :date, :purpose, :sender, :status, :user_id, :slug)
    end

end
