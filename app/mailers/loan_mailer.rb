class LoanMailer < ApplicationMailer
  default :from => "noreply@navysealcredit.com"
  def loan_email(user, loan)
    @user = user
    @loan = loan
     mail(to: user.email, subject: 'Loan Onboarding')
  end
end
