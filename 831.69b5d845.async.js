"use strict";(self.webpackChunk_hankliu_rc_mirror_editor=self.webpackChunk_hankliu_rc_mirror_editor||[]).push([[831],{29831:function(M,l,_){_.r(l),_.d(l,{ttcnCfg:function(){return D}});function I(e){for(var n={},T=e.split(" "),t=0;t<T.length;++t)n[T[t]]=!0;return n}const C={name:"ttcn-cfg",keywords:I("Yes No LogFile FileMask ConsoleMask AppendFile TimeStampFormat LogEventTypes SourceInfoFormat LogEntityName LogSourceInfo DiskFullAction LogFileNumber LogFileSize MatchingHints Detailed Compact SubCategories Stack Single None Seconds DateTime Time Stop Error Retry Delete TCPPort KillTimer NumHCs UnixSocketsEnabled LocalAddress"),fileNCtrlMaskOptions:I("TTCN_EXECUTOR TTCN_ERROR TTCN_WARNING TTCN_PORTEVENT TTCN_TIMEROP TTCN_VERDICTOP TTCN_DEFAULTOP TTCN_TESTCASE TTCN_ACTION TTCN_USER TTCN_FUNCTION TTCN_STATISTICS TTCN_PARALLEL TTCN_MATCHING TTCN_DEBUG EXECUTOR ERROR WARNING PORTEVENT TIMEROP VERDICTOP DEFAULTOP TESTCASE ACTION USER FUNCTION STATISTICS PARALLEL MATCHING DEBUG LOG_ALL LOG_NOTHING ACTION_UNQUALIFIED DEBUG_ENCDEC DEBUG_TESTPORT DEBUG_UNQUALIFIED DEFAULTOP_ACTIVATE DEFAULTOP_DEACTIVATE DEFAULTOP_EXIT DEFAULTOP_UNQUALIFIED ERROR_UNQUALIFIED EXECUTOR_COMPONENT EXECUTOR_CONFIGDATA EXECUTOR_EXTCOMMAND EXECUTOR_LOGOPTIONS EXECUTOR_RUNTIME EXECUTOR_UNQUALIFIED FUNCTION_RND FUNCTION_UNQUALIFIED MATCHING_DONE MATCHING_MCSUCCESS MATCHING_MCUNSUCC MATCHING_MMSUCCESS MATCHING_MMUNSUCC MATCHING_PCSUCCESS MATCHING_PCUNSUCC MATCHING_PMSUCCESS MATCHING_PMUNSUCC MATCHING_PROBLEM MATCHING_TIMEOUT MATCHING_UNQUALIFIED PARALLEL_PORTCONN PARALLEL_PORTMAP PARALLEL_PTC PARALLEL_UNQUALIFIED PORTEVENT_DUALRECV PORTEVENT_DUALSEND PORTEVENT_MCRECV PORTEVENT_MCSEND PORTEVENT_MMRECV PORTEVENT_MMSEND PORTEVENT_MQUEUE PORTEVENT_PCIN PORTEVENT_PCOUT PORTEVENT_PMIN PORTEVENT_PMOUT PORTEVENT_PQUEUE PORTEVENT_STATE PORTEVENT_UNQUALIFIED STATISTICS_UNQUALIFIED STATISTICS_VERDICT TESTCASE_FINISH TESTCASE_START TESTCASE_UNQUALIFIED TIMEROP_GUARD TIMEROP_READ TIMEROP_START TIMEROP_STOP TIMEROP_TIMEOUT TIMEROP_UNQUALIFIED USER_UNQUALIFIED VERDICTOP_FINAL VERDICTOP_GETVERDICT VERDICTOP_SETVERDICT VERDICTOP_UNQUALIFIED WARNING_UNQUALIFIED"),externalCommands:I("BeginControlPart EndControlPart BeginTestCase EndTestCase"),multiLineStrings:!0};var U=C.keywords,R=C.fileNCtrlMaskOptions,S=C.externalCommands,P=C.multiLineStrings,L=C.indentStatements!==!1,O=/[\|]/,E;function c(e,n){var T=e.next();if(T=='"'||T=="'")return n.tokenize=f(T),n.tokenize(e,n);if(/[:=]/.test(T))return E=T,"punctuation";if(T=="#")return e.skipToEnd(),"comment";if(/\d/.test(T))return e.eatWhile(/[\w\.]/),"number";if(O.test(T))return e.eatWhile(O),"operator";if(T=="[")return e.eatWhile(/[\w_\]]/),"number";e.eatWhile(/[\w\$_]/);var t=e.current();return U.propertyIsEnumerable(t)?"keyword":R.propertyIsEnumerable(t)?"atom":S.propertyIsEnumerable(t)?"deleted":"variable"}function f(e){return function(n,T){for(var t=!1,o,u=!1;(o=n.next())!=null;){if(o==e&&!t){var i=n.peek();i&&(i=i.toLowerCase(),(i=="b"||i=="h"||i=="o")&&n.next()),u=!0;break}t=!t&&o=="\\"}return(u||!(t||P))&&(T.tokenize=null),"string"}}function A(e,n,T,t,o){this.indented=e,this.column=n,this.type=T,this.align=t,this.prev=o}function N(e,n,T){var t=e.indented;return e.context&&e.context.type=="statement"&&(t=e.context.indented),e.context=new A(t,n,T,null,e.context)}function r(e){var n=e.context.type;return(n==")"||n=="]"||n=="}")&&(e.indented=e.context.indented),e.context=e.context.prev}const D={name:"ttcn",startState:function(){return{tokenize:null,context:new A(0,0,"top",!1),indented:0,startOfLine:!0}},token:function(e,n){var T=n.context;if(e.sol()&&(T.align==null&&(T.align=!1),n.indented=e.indentation(),n.startOfLine=!0),e.eatSpace())return null;E=null;var t=(n.tokenize||c)(e,n);if(t=="comment")return t;if(T.align==null&&(T.align=!0),(E==";"||E==":"||E==",")&&T.type=="statement")r(n);else if(E=="{")N(n,e.column(),"}");else if(E=="[")N(n,e.column(),"]");else if(E=="(")N(n,e.column(),")");else if(E=="}"){for(;T.type=="statement";)T=r(n);for(T.type=="}"&&(T=r(n));T.type=="statement";)T=r(n)}else E==T.type?r(n):L&&((T.type=="}"||T.type=="top")&&E!=";"||T.type=="statement"&&E=="newstatement")&&N(n,e.column(),"statement");return n.startOfLine=!1,t},languageData:{indentOnInput:/^\s*[{}]$/,commentTokens:{line:"#"}}}}}]);
