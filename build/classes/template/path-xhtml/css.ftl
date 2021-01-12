<#--
/*
 * $Id: css.ftl 720258 2008-11-24 19:05:16Z musachy $
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
-->
<#assign hasFieldErrors = parameters.name?? && fieldErrors?? && fieldErrors[parameters.name]??/>
class="path-dummy-cls
<#if parameters.cssClass?? && !(hasFieldErrors && parameters.cssErrorClass??)>
 ${parameters.cssClass?html}"<#rt/>
<#elseif parameters.cssClass?? && (hasFieldErrors && parameters.cssErrorClass??)>
 ${parameters.cssClass?html} ${parameters.cssErrorClass?html}"<#rt/>
<#elseif !(parameters.cssClass??) && (hasFieldErrors && parameters.cssErrorClass??)>
 ${parameters.cssErrorClass?html}"<#rt/>
<#else>
"<#rt/>
</#if>
<#if parameters.cssStyle?? && !(hasFieldErrors && (parameters.cssErrorStyle?? || parameters.cssErrorClass??))>
 style="${parameters.cssStyle?html}"<#rt/>
<#elseif hasFieldErrors && parameters.cssErrorStyle??>
 style="${parameters.cssErrorStyle?html}"<#rt/>
</#if>