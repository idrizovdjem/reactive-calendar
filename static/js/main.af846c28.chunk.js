(this["webpackJsonpreactive-calendar"]=this["webpackJsonpreactive-calendar"]||[]).push([[0],{11:function(e,t,r){e.exports={Navigation:"Navigation_Navigation__9z3ST",Logo:"Navigation_Logo__1v8mo",NavigationButton:"Navigation_NavigationButton__omDWX",Burger:"Navigation_Burger__1IBBq",Slice:"Navigation_Slice__3Sjis",MobileButtons:"Navigation_MobileButtons__2O2wV",MobileLink:"Navigation_MobileLink__Aoe8S"}},17:function(e,t,r){e.exports={Box:"CalendarBox_Box__2lRA8",Current:"CalendarBox_Current__uOHXP",FirstRow:"CalendarBox_FirstRow__TIB_Y",SecondRow:"CalendarBox_SecondRow__hRFFL",LeftBox:"CalendarBox_LeftBox__1XpaP",RightBox:"CalendarBox_RightBox__14_hI",ColorBox:"CalendarBox_ColorBox__8UtG5",Number:"CalendarBox_Number__3CyHb",Active:"CalendarBox_Active__1tYwI"}},18:function(e,t,r){e.exports={TodoContainer:"TodoContainer_TodoContainer__3HNq1",CurrentDate:"TodoContainer_CurrentDate__hNhhc",TodoSection:"TodoContainer_TodoSection__1BGjt",TodoSectionText:"TodoContainer_TodoSectionText___mZ_S",Add:"TodoContainer_Add__1prwe",Form:"TodoContainer_Form__3WvJa",NoTodos:"TodoContainer_NoTodos__17Hgu",Todos:"TodoContainer_Todos__1HawL"}},23:function(e,t,r){e.exports={TodoForm:"TodoForm_TodoForm__2kOIN",TitleInput:"TodoForm_TitleInput__1Tv0r",Textarea:"TodoForm_Textarea__1PNzc",CreateButton:"TodoForm_CreateButton__1K4wB",TitleLabel:"TodoForm_TitleLabel__2DRFM"}},28:function(e,t,r){e.exports={Todo:"Todo_Todo__1tPH5",TodoText:"Todo_TodoText__skZpM",Icon:"Todo_Icon__2yVEi"}},29:function(e,t,r){e.exports={Label:"Label_Label__2R2-t",LabelText:"Label_LabelText__3yDWO",Icon:"Label_Icon__3Nmlq"}},35:function(e,t,r){e.exports={LoginContainer:"Login_LoginContainer__3yL9J",Slogan:"Login_Slogan__3O6SN"}},36:function(e,t,r){e.exports={RegisterContainer:"Register_RegisterContainer__12l1T",Slogan:"Register_Slogan__2kV9W"}},50:function(e,t,r){e.exports={Loader:"Spinner_Loader__1GOUL",load6:"Spinner_load6__1rG_Z",round:"Spinner_round__36623"}},51:function(e,t,r){e.exports={Calendar:"Calendar_Calendar__2wnNf"}},52:function(e,t,r){e.exports={Row:"CalendarRow_Row__2VF7W"}},53:function(e,t,r){e.exports={TodoRow:"CalendarTodo_TodoRow__14rYH"}},55:function(e,t,r){e.exports={TodoLabels:"TodoLabels_TodoLabels__3b3Y_"}},60:function(e,t,r){},89:function(e,t,r){"use strict";r.r(t);var a=r(1),n=r.n(a),s=r(48),o=r.n(s),c=(r(60),r(37)),i=r(4),l=r(5),u=r(7),d=r(6),p=r(21),h=r(9),b=r(2),j=r.n(b),f=r(8),v=r(32),x=r.n(v);x.a.defaults.baseURL="https://reactive-calendar.glitch.me";var g=x.a;function m(){return(m=Object(f.a)(j.a.mark((function e(t){var r,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.post("/users/register",t);case 2:return r=e.sent,(a=r.data.response).successfull&&_(a.data.authToken),e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){return(O=Object(f.a)(j.a.mark((function e(t){var r,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.post("/users/login",t);case 2:return r=e.sent,(a=r.data.response).successfull&&_(a.data.authToken),e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(e){localStorage.setItem("authToken",e)}var y={isUserAuthenticated:function(){return null!==localStorage.getItem("authToken")},register:function(e){return m.apply(this,arguments)},login:function(e){return O.apply(this,arguments)},logout:function(){localStorage.removeItem("authToken")}},C=r(11),k=r.n(C),T=r(0),N=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(){var e;Object(i.a)(this,r);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).state={showMobile:!1},e.redirect=function(t){e.props.redirect(e.props.history,t)},e.logout=function(){e.setState({showMobile:!1}),y.logout(),e.props.redirect(e.props.history,"/Login",!1)},e.toggleMobileButtons=function(){e.setState({showMobile:!e.state.showMobile})},e}return Object(l.a)(r,[{key:"render",value:function(){var e=this,t=null;t=this.props.isAuthenticated?Object(T.jsxs)("span",{children:[Object(T.jsx)("div",{onClick:function(){return e.redirect("/Calendar")},className:k.a.MobileLink,children:"Calendar"}),Object(T.jsx)("div",{onClick:function(){return e.redirect("/Overview")},className:k.a.MobileLink,children:"Overview"}),Object(T.jsx)("div",{onClick:this.logout,className:k.a.MobileLink,children:"Logout"})]}):Object(T.jsxs)("span",{children:[Object(T.jsx)("div",{onClick:function(){return e.redirect("/Login")},className:k.a.MobileLink,children:"Login"}),Object(T.jsx)("div",{onClick:function(){return e.redirect("/Register")},className:k.a.MobileLink,children:"Register"})]});var r=null;r=this.props.isAuthenticated?Object(T.jsxs)("span",{children:[Object(T.jsx)("button",{onClick:this.logout,className:k.a.NavigationButton,children:"Logout"}),Object(T.jsx)("button",{onClick:function(){return e.redirect("/Overview")},className:k.a.NavigationButton,children:"Overview"}),Object(T.jsx)("button",{onClick:function(){return e.redirect("/Calendar")},className:k.a.NavigationButton,children:"Calendar"})]}):Object(T.jsxs)("span",{children:[Object(T.jsx)(p.b,{to:"/Register",className:k.a.NavigationButton,children:"Register"}),Object(T.jsx)(p.b,{to:"/Login",className:k.a.NavigationButton,children:"Login"})]});var a={display:this.state.showMobile?"block":"none"};return Object(T.jsxs)("nav",{className:k.a.Navigation,children:[Object(T.jsx)("span",{onClick:function(){return e.redirect("/")},to:"/",className:k.a.Logo,children:"Reactive Calendar"}),r,Object(T.jsxs)("div",{onClick:this.toggleMobileButtons,className:k.a.Burger,children:[Object(T.jsx)("div",{className:k.a.Slice}),Object(T.jsx)("div",{className:k.a.Slice}),Object(T.jsx)("div",{className:k.a.Slice})]}),Object(T.jsx)("div",{style:a,className:k.a.MobileButtons,children:t})]})}}]),r}(a.Component),w=Object(h.f)(N),L=r(12),S=r(35),M=r.n(S),I=function(e){return Object(T.jsx)("div",{className:"alert alert-".concat(e.alert),role:"alert",children:e.message})},B=r(50),R=r.n(B),A=function(){return Object(T.jsx)("div",{className:R.a.Loader,children:"Loading..."})},D=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(e){var a;return Object(i.a)(this,r),(a=t.call(this,e)).login=function(){var e=Object(f.a)(j.a.mark((function e(t){var r,n,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),r=a.emailInput.current.value.trim(),n=a.passwordInput.current.value.trim(),r&&!(r.length<5)){e.next=6;break}return alert("Email is required!"),e.abrupt("return");case 6:if(n&&!(n.length<6)){e.next=9;break}return alert("Password must be at least 6 symbols!"),e.abrupt("return");case 9:return a.setState({isLoading:!0}),e.next=12,y.login({email:r,password:n});case 12:(s=e.sent).successfull?(a.setState({isLoading:!1}),a.props.redirect(a.props.history,"/Calendar",!0)):a.setState({errorMessages:Object(L.a)(s.errorMessages),isLoading:!1});case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.state={isLoading:!1,errorMessages:[]},a.emailInput=n.a.createRef(null),a.passwordInput=n.a.createRef(null),a}return Object(l.a)(r,[{key:"render",value:function(){var e=this.state.isLoading?Object(T.jsx)(A,{}):null,t=[];return this.state.errorMessages.map((function(e,r){return t.push(Object(T.jsx)(I,{alert:"danger",message:e},r))})),Object(T.jsxs)("div",{className:M.a.LoginContainer,children:[e,Object(T.jsx)("p",{className:M.a.Slogan,children:"Log in to your reactive account"}),Object(T.jsxs)("form",{children:[t,Object(T.jsxs)("div",{className:"form-group",children:[Object(T.jsx)("label",{children:"Email address"}),Object(T.jsx)("input",{type:"email",className:"form-control",placeholder:"Enter your email",ref:this.emailInput})]}),Object(T.jsxs)("div",{className:"form-group",children:[Object(T.jsx)("label",{children:"Password"}),Object(T.jsx)("input",{type:"password",className:"form-control",placeholder:"Enter your password",ref:this.passwordInput})]}),Object(T.jsx)("button",{onClick:this.login,className:"btn btn-primary w-100",children:"Log in"})]})]})}}]),r}(a.Component),F=r(36),H=r.n(F),E=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(e){var a;return Object(i.a)(this,r),(a=t.call(this,e)).register=function(){var e=Object(f.a)(j.a.mark((function e(t){var r,n,s,o,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),r=a.emailInput.current.value.trim(),n=a.usernameInput.current.value.trim(),s=a.passwordInput.current.value.trim(),o=a.repeatPasswordInput.current.value.trim(),r&&!(r.length<5)){e.next=8;break}return alert("Email is required!"),e.abrupt("return");case 8:if(n&&!(n.length<5)){e.next=11;break}return alert("Username must be at least 5 symbols long!"),e.abrupt("return");case 11:if(s&&!(s.length<6)){e.next=14;break}return alert("Password must be at least 6 symbols long!"),e.abrupt("return");case 14:if(s===o){e.next=17;break}return alert("Passwords does not match!"),e.abrupt("return");case 17:return a.setState({isLoading:!0}),e.next=20,y.register({email:r,username:n,password:s});case 20:(c=e.sent).successfull?(a.setState({isLoading:!1}),a.props.redirect(a.props.history,"/Calendar",!0)):a.setState({isLoading:!1,errorMessages:Object(L.a)(c.errorMessages)});case 22:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.state={isLoading:!1,errorMessages:[]},a.emailInput=n.a.createRef(null),a.usernameInput=n.a.createRef(null),a.passwordInput=n.a.createRef(null),a.repeatPasswordInput=n.a.createRef(null),a}return Object(l.a)(r,[{key:"render",value:function(){var e=this.state.isLoading?Object(T.jsx)(A,{}):null,t=[];return this.state.errorMessages.map((function(e,r){return t.push(Object(T.jsx)(I,{alert:"danger",message:e},r))})),Object(T.jsxs)("div",{className:H.a.RegisterContainer,children:[e,Object(T.jsx)("p",{className:H.a.Slogan,children:"Register your reactive account"}),Object(T.jsxs)("form",{children:[t,Object(T.jsxs)("div",{className:"form-group",children:[Object(T.jsx)("label",{children:"Email address"}),Object(T.jsx)("input",{type:"email",className:"form-control",placeholder:"Enter your email",ref:this.emailInput})]}),Object(T.jsxs)("div",{className:"form-group",children:[Object(T.jsx)("label",{children:"Username"}),Object(T.jsx)("input",{type:"text",className:"form-control",placeholder:"Enter your username",ref:this.usernameInput})]}),Object(T.jsxs)("div",{className:"form-group",children:[Object(T.jsx)("label",{children:"Password"}),Object(T.jsx)("input",{type:"password",className:"form-control",placeholder:"Enter your password",ref:this.passwordInput})]}),Object(T.jsxs)("div",{className:"form-group",children:[Object(T.jsx)("label",{children:"Repeat password"}),Object(T.jsx)("input",{type:"password",className:"form-control",placeholder:"Repeat your password",ref:this.repeatPasswordInput})]}),Object(T.jsx)("button",{onClick:this.register,className:"btn btn-primary w-100",children:"Register"})]})]})}}]),r}(a.Component),P=r(51),q=r.n(P),U=r(84),Y=r(85),V=r(86);var W={convertFromNumber:function(e){var t=e.toString(),r=t.substr(0,4),a=t.substr(4,2),n=t.substr(6,2);return"".concat(r,"/").concat(a,"/").concat(n)},getCalendarDays:function(e,t){U.extend(Y),U.extend(V);var r={year:e,month:t,current:{}},a=U("".concat(e,"/").concat(t,"/01")),n=a.daysInMonth();if(r.current={start:a.day(),max:a.daysInMonth(),active:U().date()},0===r.current.start&&(r.current.start=7),1!==r.current.start){var s=U("".concat(e,"/").concat(t-1,"/01")),o=s.daysInMonth(),c=o-(r.current.start-2);n+=o-c+1,r.previous={from:c,to:s.daysInMonth()}}return n<42&&(r.next={to:42-n}),function(e){var t=[],r=e.year,a=e.month;if(r=Number(r),a=Number(a),e.previous){var n,s;1===a?(s=12,n=r-1):((s=a-1)<10&&(s="0".concat(s)),n=r);for(var o=e.previous.from;o<=e.previous.to;o++)t.push({date:parseInt("".concat(n).concat(s).concat(o)),currentMonth:!1,isActive:!1,day:o,todos:[]})}var c=a;c<10&&(c="0".concat(a));for(var i=1;i<=e.current.max;i++){var l=i;l<10&&(l="0".concat(l));var u={date:parseInt("".concat(r).concat(c).concat(l)),currentMonth:!0,isActive:!1,day:i,todos:[]};i===e.current.active&&(u.isActive=!0),t.push(u)}if(e.next){var d,p;12===a?(p=1,d=r+1):(p=a+1,d=r),p<10&&(p="0".concat(p));for(var h=1;h<=e.next.to;h++){var b="0".concat(h),j={date:parseInt("".concat(d).concat(p).concat(b)),currentMonth:!1,isActive:!1,day:h,todos:[]};t.push(j)}}return t}(r)},getCurrentDate:function(){return{year:U().format("YYYY"),month:U().format("M"),day:U().format("D")}}};function G(){return(G=Object(f.a)(j.a.mark((function e(t){var r,a,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=z({date:t}),e.next=3,g.post("/todo/daily",r);case 3:return a=e.sent,n=a.data.response,e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(){return(J=Object(f.a)(j.a.mark((function e(t,r){var a,n,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=z({startDate:t,endDate:r}),e.next=4,g.post("/todo/getForDateRange",a);case 4:return n=e.sent,s=n.data.response,e.abrupt("return",s);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function X(){return(X=Object(f.a)(j.a.mark((function e(t){var r,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=z(t),e.next=3,g.post("/todo/create",r);case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Z(){return(Z=Object(f.a)(j.a.mark((function e(t,r){var a,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=z({todoId:t,newCheckState:r}),e.next=3,g.post("/todo/updateCheck",a);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function z(e){var t=localStorage.getItem("authToken");return e.authToken=t,e}var K={changeTodoCheckedState:function(e,t){return Z.apply(this,arguments)},getDailyTodos:function(e){return G.apply(this,arguments)},getTodosForDates:function(e,t){return J.apply(this,arguments)},create:function(e){return X.apply(this,arguments)}},Q=r(52),$=r.n(Q),ee=r(17),te=r.n(ee),re=r(53),ae=r.n(re),ne=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(){return Object(i.a)(this,r),t.apply(this,arguments)}return Object(l.a)(r,[{key:"render",value:function(){var e={backgroundColor:this.props.backgroundColor};return Object(T.jsx)("div",{style:e,className:ae.a.TodoRow})}}]),r}(a.Component),se=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(){var e;Object(i.a)(this,r);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).redirect=function(){var t=e.props.dateObject.date;e.props.redirect(e.props.history,"/Todo/".concat(t))},e}return Object(l.a)(r,[{key:"render",value:function(){var e=[];this.props.dateObject.todos.length>0&&this.props.dateObject.todos.forEach((function(t,r){e.push(Object(T.jsx)(ne,{backgroundColor:t.label.backgroundColor},r))}));var t=this.props.dateObject,r=t.currentMonth?te.a.Current:te.a.Box,a=t.isActive?te.a.Active:te.a.Number;return Object(T.jsxs)("td",{className:r,onClick:this.redirect,children:[Object(T.jsxs)("span",{className:te.a.FirstRow,children:[Object(T.jsx)("div",{className:te.a.LeftBox,children:Object(T.jsx)("div",{className:te.a.ColorBox})}),Object(T.jsx)("div",{className:te.a.RightBox,children:Object(T.jsx)("p",{className:a,children:t.day})})]}),Object(T.jsx)("span",{className:te.a.SecondRow,children:e})]})}}]),r}(a.Component),oe=Object(h.f)(se),ce=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(){return Object(i.a)(this,r),t.apply(this,arguments)}return Object(l.a)(r,[{key:"render",value:function(){var e=[];if(this.props.days.length>0)for(var t=0;t<this.props.days.length;t++){var r=this.props.days[t];e.push(Object(T.jsx)(oe,{redirect:this.props.redirect,dateObject:r},t))}return Object(T.jsx)("tr",{className:$.a.Row,children:e})}}]),r}(a.Component),ie=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(){var e;Object(i.a)(this,r);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).state={isLoading:!1,errorMessages:[],days:[],date:{}},e.updateDate=Object(f.a)(j.a.mark((function t(){var r,a,n,s,o,c,i;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState({isLoading:!0}),r=W.getCurrentDate(),a=r.year,n=r.month,s=W.getCalendarDays(a,n),o=s[0].date,c=s[s.length-1].date,t.next=8,K.getTodosForDates(o,c);case 8:if((i=t.sent).successfull){t.next=12;break}return e.setState({isLoading:!1,errorMessages:Object(L.a)(i.errorMessages)}),t.abrupt("return");case 12:i.data.todos.forEach((function(e){var t=s.find((function(t){return t.date===e.date}));t.todos.length<3&&t.todos.push(e)})),e.setState({isLoading:!1,days:Object(L.a)(s),date:r});case 15:case"end":return t.stop()}}),t)}))),e}return Object(l.a)(r,[{key:"componentDidMount",value:function(){var e=Object(f.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.updateDate();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){if(this.state.errorMessages.length>0)return this.state.errorMessages.map((function(e,t){return Object(T.jsx)(I,{alert:"danger",message:e},t)}));if(this.state.isLoading)return Object(T.jsx)(A,{});var e=[];if(0!==this.state.days.length)for(var t=0,r=0;r<6;r++){for(var a=[],n=0;n<7;n++)a.push(this.state.days[t++]);e.push(Object(T.jsx)(ce,{redirect:this.props.redirect,days:a},r))}return Object(T.jsxs)("table",{className:q.a.Calendar,children:[Object(T.jsx)("thead",{children:Object(T.jsxs)("tr",{children:[Object(T.jsx)("th",{children:"Mon"}),Object(T.jsx)("th",{children:"Tue"}),Object(T.jsx)("th",{children:"Wed"}),Object(T.jsx)("th",{children:"Thu"}),Object(T.jsx)("th",{children:"Fri"}),Object(T.jsx)("th",{children:"Sat"}),Object(T.jsx)("th",{children:"Sun"})]})}),Object(T.jsx)("tbody",{children:e})]})}}]),r}(a.Component),le=r(22),ue=r(19),de=r(18),pe=r.n(de),he=r(28),be=r.n(he),je=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(){var e;Object(i.a)(this,r);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).state={isChecked:e.props.isChecked},e.changeCheckedHandler=Object(f.a)(j.a.mark((function t(){var r,a;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=!e.state.isChecked,a=e.props.id,e.setState({isChecked:r}),t.next=5,K.changeTodoCheckedState(a,r);case 5:case"end":return t.stop()}}),t)}))),e}return Object(l.a)(r,[{key:"render",value:function(){var e=this.state.isChecked?ue.b:ue.d;return Object(T.jsxs)("div",{style:this.props.label,className:be.a.Todo,children:[Object(T.jsx)("div",{style:{color:this.props.label.color},className:be.a.TodoText,children:this.props.title}),Object(T.jsx)(le.a,{onClick:this.changeCheckedHandler,icon:e,className:be.a.Icon})]})}}]),r}(a.Component),fe=r(23),ve=r.n(fe),xe=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(e){var a;return Object(i.a)(this,r),(a=t.call(this,e)).createTodoHandler=function(){var e=a.titleInput.current.value,t=a.descriptionTextArea.current.value;e&&t?(a.titleInput.current.value="",a.descriptionTextArea.current.value="",a.props.create(e,t)):alert("Title and description are required!")},a.titleInput=n.a.createRef(null),a.descriptionTextArea=n.a.createRef(null),a}return Object(l.a)(r,[{key:"render",value:function(){return Object(T.jsxs)("div",{className:ve.a.TodoForm,children:[Object(T.jsx)("label",{htmlFor:"title",className:ve.a.TitleLabel,children:"Title"}),Object(T.jsx)("input",{type:"text",placeholder:"Something very important",id:"title",className:ve.a.TitleInput,ref:this.titleInput}),Object(T.jsx)("textarea",{className:ve.a.Textarea,placeholder:"Describe the very important thing",ref:this.descriptionTextArea}),Object(T.jsx)("button",{onClick:this.createTodoHandler,className:ve.a.CreateButton,children:"Create"})]})}}]),r}(a.Component),ge=r(54);function me(){return(me=Object(f.a)(j.a.mark((function e(){var t,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.get("/labels/all");case 2:return t=e.sent,r=t.data.response,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Oe={getAll:function(){return me.apply(this,arguments)}},_e=r(55),ye=r.n(_e),Ce=r(29),ke=r.n(Ce),Te=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(){var e;Object(i.a)(this,r);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).state={isSelected:e.props.isSelected},e.changeLabelHandler=function(){var t={backgroundColor:e.props.backgroundColor,color:e.props.color,text:e.props.text};e.props.change(t)},e}return Object(l.a)(r,[{key:"render",value:function(){var e={backgroundColor:this.props.backgroundColor,color:this.props.color},t=this.props.isSelected?Object(T.jsx)(le.a,{icon:ue.a,className:ke.a.Icon,style:{color:this.props.color}}):null;return Object(T.jsxs)("div",{onClick:this.changeLabelHandler,className:ke.a.Label,children:[t,Object(T.jsx)("p",{style:e,className:ke.a.LabelText,children:this.props.text})]})}}]),r}(a.Component),Ne=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(){var e;Object(i.a)(this,r);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).state={isLoading:!0,errorMessages:[],labels:[]},e.changeLabelHandler=function(t){var r,a=e.state.labels.slice(),n=a.find((function(e){return e.backgroundColor===t.backgroundColor&&e.color===t.color})),s=Object(ge.a)(a);try{for(s.s();!(r=s.n()).done;){r.value.isSelected=!1}}catch(o){s.e(o)}finally{s.f()}n.isSelected=!0,e.setState({labels:Object(L.a)(a)}),e.props.change(t)},e}return Object(l.a)(r,[{key:"componentDidMount",value:function(){var e=Object(f.a)(j.a.mark((function e(){var t,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({isLoading:!0}),e.next=3,Oe.getAll();case 3:(t=e.sent).successfull?(r=t.data.labels.map((function(e){return e.isSelected=!1,e})),this.setState({isLoading:!1,labels:Object(L.a)(r)})):this.setState({isLoading:!1,errorMessages:Object(L.a)(t.errorMessages)});case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.isLoading?Object(T.jsx)(A,{}):null,r=[];this.state.errorMessages.forEach((function(e){r.push(Object(T.jsx)(I,{alert:"danger",message:e}))}));var a=[];return this.state.labels.map((function(t,r){return a.push(Object(T.jsx)(Te,{change:e.changeLabelHandler,backgroundColor:t.backgroundColor,color:t.color,text:t.text,isSelected:t.isSelected},r))})),Object(T.jsxs)("div",{className:ye.a.TodoLabels,children:[r,t,a]})}}]),r}(a.Component),we=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(){var e;Object(i.a)(this,r);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).state={isLoading:!1,errorMessages:[],showCreateForm:!1,todos:[],currentDate:null,selectedLabel:null},e.createTodoHandler=function(){var t=Object(f.a)(j.a.mark((function t(r,a){var n,s,o;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.state.selectedLabel){t.next=3;break}return alert("Choose label"),t.abrupt("return");case 3:if(r){t.next=8;break}return alert("Title is required!"),t.abrupt("return");case 8:if(!((r=r.trim()).length<1)){t.next=12;break}return alert("Title is required!"),t.abrupt("return");case 12:if(a){t.next=17;break}return alert("Description is required!"),t.abrupt("return");case 17:if(!((a=a.trim()).length<1)){t.next=21;break}return alert("Description is required!"),t.abrupt("return");case 21:return e.setState({isLoading:!0}),t.next=24,K.create({title:r,description:a,labelText:e.state.selectedLabel.text,date:e.state.currentDate});case 24:n=t.sent,(s=n.data.response).successfull?((o=s.data.todo).label=e.state.selectedLabel,e.setState({isLoading:!1,todos:[].concat(Object(L.a)(e.state.todos),[o]),selectedLabel:null,showCreateForm:!1})):e.setState({errorMessages:Object(L.a)(s.errorMessages),isLoading:!1,selectedLabel:null,showCreateForm:!1});case 27:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),e.changeTodoLabelHandler=function(t){e.setState({selectedLabel:t})},e.toggleCreateFormVisibility=function(){e.setState({showCreateForm:!e.state.showCreateForm})},e}return Object(l.a)(r,[{key:"componentDidMount",value:function(){var e=Object(f.a)(j.a.mark((function e(){var t,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.match.params.date,this.setState({isLoading:!0}),e.next=4,K.getDailyTodos(t);case 4:(r=e.sent).successfull?this.setState({todos:Object(L.a)(r.data.todos),isLoading:!1,currentDate:t}):this.setState({errorMessages:Object(L.a)(r.errorMessages),isLoading:!1,currentDate:t});case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){if(this.state.isLoading)return Object(T.jsx)(A,{});var e=[];if(this.state.errorMessages.forEach((function(t,r){e.push(Object(T.jsx)(I,{alert:"danger",message:t},r))})),e.length>0)return e;var t=null;this.state.showCreateForm&&(t=Object(T.jsxs)("div",{className:pe.a.Form,children:[Object(T.jsx)(xe,{create:this.createTodoHandler}),Object(T.jsx)(Ne,{change:this.changeTodoLabelHandler})]}));var r=[];this.state.todos.forEach((function(e){var t=Object(T.jsx)(je,{title:e.title,label:e.label,isChecked:e.isChecked,id:e.id},e.id);r.push(t)}));var a=null;0===this.state.todos.length&&(a=Object(T.jsx)("h3",{className:pe.a.NoTodos,children:"No created todos! Create one :)"}));var n=this.state.currentDate?W.convertFromNumber(this.state.currentDate):null;return Object(T.jsxs)("div",{className:pe.a.TodoContainer,children:[Object(T.jsxs)("span",{className:pe.a.CurrentDate,children:["Current date: ",n]}),Object(T.jsxs)("div",{className:pe.a.TodoSection,children:[Object(T.jsx)("span",{className:pe.a.TodoSectionText,children:"Todo section:"}),Object(T.jsx)(le.a,{onClick:this.toggleCreateFormVisibility,icon:ue.c,className:pe.a.Add}),t,Object(T.jsx)("div",{className:pe.a.Todos,children:r}),a]})]})}}]),r}(a.Component),Le=function(e){Object(u.a)(r,e);var t=Object(d.a)(r);function r(){var e;Object(i.a)(this,r);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).state={isAuthenticated:!1},e.redirect=function(t,r,a){t.push(r),sessionStorage.setItem("page",r),void 0!==a&&e.setState({isAuthenticated:a})},e}return Object(l.a)(r,[{key:"componentDidMount",value:function(){var e=y.isUserAuthenticated();this.setState({isAuthenticated:e})}},{key:"render",value:function(){var e=this,t=function(t,r){return y.isUserAuthenticated()||r.history.push("/Login"),Object(T.jsx)(t,Object(c.a)({redirect:e.redirect},r))},r=function(t,r){return y.isUserAuthenticated()&&r.history.push("/Calendar"),Object(T.jsx)(t,Object(c.a)({redirect:e.redirect},r))};return Object(T.jsx)("div",{children:Object(T.jsxs)(p.a,{children:[Object(T.jsx)(w,{redirect:this.redirect,isAuthenticated:this.state.isAuthenticated}),Object(T.jsxs)(h.c,{children:[Object(T.jsx)(h.a,{path:"/Login",exact:!0,render:function(e){return r(D,e)}}),Object(T.jsx)(h.a,{path:"/Register",exact:!0,render:function(e){return r(E,e)}}),Object(T.jsx)(h.a,{path:"/Calendar",exact:!0,render:function(e){return t(ie,e)}}),Object(T.jsx)(h.a,{path:"/Todo/:date",exact:!0,render:function(e){return t(we,e)}}),Object(T.jsx)(h.a,{path:"/",exact:!0,render:function(e){return t(ie,e)}})]})]})})}}]),r}(a.Component);o.a.render(Object(T.jsx)(n.a.StrictMode,{children:Object(T.jsx)(Le,{})}),document.getElementById("root"))}},[[89,1,2]]]);
//# sourceMappingURL=main.af846c28.chunk.js.map