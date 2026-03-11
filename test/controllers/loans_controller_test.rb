require "test_helper"

class LoansControllerTest < ActionDispatch::IntegrationTest
  setup do
    @loan = loans(:one)
  end

  test "should get index" do
    get loans_url
    assert_response :success
  end

  test "should get new" do
    get new_loan_url
    assert_response :success
  end

  test "should create loan" do
    assert_difference('Loan.count') do
      post loans_url, params: { loan: { amount: @loan.amount, budget: @loan.budget, business_name: @loan.business_name, date: @loan.date, desc: @loan.desc, email: @loan.email, first_name: @loan.first_name, interest: @loan.interest, last_name: @loan.last_name, name: @loan.name, project_desc: @loan.project_desc, project_name: @loan.project_name, project_size: @loan.project_size, slug: @loan.slug, user_id: @loan.user_id } }
    end

    assert_redirected_to loan_url(Loan.last)
  end

  test "should show loan" do
    get loan_url(@loan)
    assert_response :success
  end

  test "should get edit" do
    get edit_loan_url(@loan)
    assert_response :success
  end

  test "should update loan" do
    patch loan_url(@loan), params: { loan: { amount: @loan.amount, budget: @loan.budget, business_name: @loan.business_name, date: @loan.date, desc: @loan.desc, email: @loan.email, first_name: @loan.first_name, interest: @loan.interest, last_name: @loan.last_name, name: @loan.name, project_desc: @loan.project_desc, project_name: @loan.project_name, project_size: @loan.project_size, slug: @loan.slug, user_id: @loan.user_id } }
    assert_redirected_to loan_url(@loan)
  end

  test "should destroy loan" do
    assert_difference('Loan.count', -1) do
      delete loan_url(@loan)
    end

    assert_redirected_to loans_url
  end
end
