<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

 <%
    String paramValue = (String) request.getAttribute("ALERT_LOGIN_AFTER_FINAL_SIGNOFF_FLAG");
 	if("1".equals(paramValue)) 
 	{
 %>
<ps:text name='cannot_access_screen_without_manger_approval_key' />
<%
	}
  	else
 	{ 
 %>
<ps:text name='Login_Alert_Redirection_key' />
<%
	} 
%>
