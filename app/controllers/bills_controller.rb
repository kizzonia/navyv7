class BillsController < InheritedResources::Base
  layout "accounts"
    before_action :authenticate_user!
    before_action :find_bill, only: [ :show, :edit, :update, :destroy]

      def index
        @users = User.where(user_id: current_user)
        @bills = Bill.where(user_id: current_user).order('created_at DESC')
        @accounts = Account.where(user_id: current_user).order('created_at ASC')
        @transactions = Transaction.where(user_id: current_user).order('created_at DESC')
        @transfers = Transfer.where(user_id: current_user).order('created_at DESC')

      end

      def show

      end

      def new
        @bill = current_user.bills.build

      end

      def create
        @bill = current_user.bills.build(bill_params)
        if @bill.save
          user = User.find_by_id(@bill.user_id)
          bill = @bill
          redirect_to root_path, notice: " New Bill Recorded"
        else
          render 'new'
        end
      end
      def edit

      end

      def update
        if @bill.update(bill_params)
          redirect_to @bill
        else
          render 'edit'
        end
      end

      private
      def find_bill
        @bill = Bill.friendly.find(params[:id])

      end
    def bill_params
      params.require(:bill).permit(:name, :service, :amount, :date, :user_id, :slug)
    end

end
