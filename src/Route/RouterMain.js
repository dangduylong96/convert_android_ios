import { SwitchNavigator } from 'react-navigation';
import CheckRouteScreen from './CheckRouteScreen';
import Login from '../Components/LoginScreen/Login';
import ChooseUsers from '../Components/ChooseUsers/ChooseUsers';
import RuleBorrow from '../Components/Rules/RuleBorrow';
import ChooseUserBorrows from '../Components/ChooseUserBorrows/ChooseUserBorrows';
import BorrowStudent from '../Components/Parkages/BorrowStudent';
import StudentStep1 from '../Components/DetailStudent/StudentStep1';
import StudentStep2 from '../Components/DetailStudent/StudentStep2';
import StudentStep3 from '../Components/DetailStudent/StudentStep3';
import StudentWorkStep3 from '../Components/DetailStudent/StudentWorkStep3';
import StudentStep4 from '../Components/DetailStudent/StudentStep4';
import StudentStep5 from '../Components/DetailStudent/StudentStep5';
import StudentStep6 from '../Components/DetailStudent/StudentStep6';
import StudentWorkStep5 from '../Components/DetailStudent/StudentWorkStep5';
import TabbarRoute from './TabbarRoute';
import DetailHistoryBorrow from '../Components/History/DetailHistoryBorrow';
import EditStep1 from '../Components/EditDetailBorrow/EditStep1';
import EditStep2 from '../Components/EditDetailBorrow/EditStep2';
import EditStep3 from '../Components/EditDetailBorrow/EditStep3';
import EditWorkStep3 from '../Components/EditDetailBorrow/EditWorkStep3';
import EditStep4 from '../Components/EditDetailBorrow/EditStep4';
import EditStep5 from '../Components/EditDetailBorrow/EditStep5';
import AddNewBorrow from '../Components/AddNewBorrow/AddNewBorrow';
//Nhà đầu tư
import RuleInvestor from '../Components/Rules/RuleInvestor';
import DetailInvestor from '../Components/DetailInvestor/DetailInvestor';
import TabbarRouteInvestor from './TabbarRouteInvestor';
import EditDetailInvestor from '../Components/DetailInvestor/EditDetailInvestor';

export default RouterMain=SwitchNavigator(
    {
        CheckRouteScreen: CheckRouteScreen,
        Login: Login,
        ChooseType: ChooseUsers,
        Rule: RuleBorrow,
        ChooseUserBorrows: ChooseUserBorrows,
        BorrowStudent: BorrowStudent,
        StudentStep1: StudentStep1,
        StudentStep2: StudentStep2,
        StudentStep3: StudentStep3,
        StudentWorkStep3: StudentWorkStep3,
        StudentStep4: StudentStep4,
        StudentStep5: StudentStep5,
        StudentWorkStep5: StudentWorkStep5,
        StudentStep6: StudentStep6,
        TabbarRoute: TabbarRoute,
        DetailHistoryBorrow: DetailHistoryBorrow,
        EditStep1: EditStep1,
        EditStep2: EditStep2,
        EditStep3: EditStep3,
        EditStep4: EditStep4,
        EditStep5: EditStep5,
        AddNewBorrow: AddNewBorrow,
        EditWorkStep3: EditWorkStep3,
        RuleInvestor: RuleInvestor,
        DetailInvestor: DetailInvestor,
        TabbarRouteInvestor: TabbarRouteInvestor,
        EditDetailInvestor: EditDetailInvestor
    },
    {
        initialRouteName: 'CheckRouteScreen'
        // initialRouteName: 'EditStep5',
    }
);