<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%/*needed to specify meta tag decorator since on wildfly it is not detected automatically*/ %>
<meta name="decorator" content="main"/>
<head>
<title><ps:text name="app_main_title_payh_key"/></title>
</head>


<script type="text/javascript"  src="${pageContext.request.contextPath}/common/js/tabs/TabbedPanel.js"></script>
<script type="text/javascript">
	var RTL_DIRECTION = "${isRTL}";

	$(document).ready(function() {
		intializeMainTabs("mainTabs",{url:jQuery.contextPath+"/path/loadScreen?",reloadAlert:"<ps:text name='reload_contents_key'/>",closeAlert:"<ps:text name='close'/>"});

	});
</script>
<body >

<%/*Added padding top and buttom to overwrite Tabs Padding (.ui-tabs)*/%>
<div id="mainTabs" class="pathMinWidth" style="visibility: hidden;padding-bottom: 0px; padding-top: 0px;height: 100%; ">
    <%/*Required for toolbar positioning*/%>
	<ul></ul>
</div>

<jsp:include page="../../payh/common/PAYHAppTrans.jsp"></jsp:include>

</body>
