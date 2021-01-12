package com.path.payh.bo.mxmessagedefinition;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;

import com.path.lib.common.util.StringUtil;
import com.path.vo.mxmessageparser.SimpleTypeCO;
import com.path.vo.mxmessageparser.TagsCo;
import com.predic8.schema.Choice;
import com.predic8.schema.ComplexType;
import com.predic8.schema.Element;
import com.predic8.schema.Schema;
import com.predic8.schema.SchemaParser;
import com.predic8.schema.Sequence;
import com.predic8.schema.SimpleType;
import com.predic8.schema.restriction.BaseRestriction;
import com.predic8.schema.restriction.facet.EnumerationFacet;
import com.predic8.schema.restriction.facet.Facet;
import com.predic8.schema.restriction.facet.FractionDigits;
import com.predic8.schema.restriction.facet.LengthFacet;
import com.predic8.schema.restriction.facet.MaxExclusiveFacet;
import com.predic8.schema.restriction.facet.MaxInclusiveFacet;
import com.predic8.schema.restriction.facet.MaxLengthFacet;
import com.predic8.schema.restriction.facet.MinExclusiveFacet;
import com.predic8.schema.restriction.facet.MinInclusiveFacet;
import com.predic8.schema.restriction.facet.MinLengthFacet;
import com.predic8.schema.restriction.facet.PatternFacet;
import com.predic8.schema.restriction.facet.TotalDigitsFacet;
import com.predic8.schema.restriction.facet.WhiteSpaceFacet;

public class XsdParser {

	public final static String SIMPLE_TYPE = "simpleType";
	public final static String COMPLEX_TYPE = "complexType";
	static HashMap<String, String> types = new HashMap<String, String>();
	static HashMap<String, SimpleTypeCO> map = new HashMap<String, SimpleTypeCO>();
	
	
	/**
	 * prepare Data
	 * @param data
	 */
	public static void prepareData(HashMap<String, Object> data)
	{
		TagsCO t1 = new TagsCO();
		t1.setName("FIToFIPmtStsReq");
		t1.setValue("null");
		data.put("FIToFIPmtStsReq", t1);
		
		TagsCO t2 = new TagsCO();
		t2.setName("TxInf");
		t2.setValue("null");
		data.put("FIToFIPmtStsReq_TxInf", t2);
		
		TagsCO t3 = new TagsCO();
		t3.setName("InstgAgt");
		t3.setValue("null");
		data.put("FIToFIPmtStsReq_TxInf_InstgAgt", t3);
		
		
		TagsCO t4 = new TagsCO();
		t4.setName("BrnchId");
		t4.setValue("null");
		data.put("FIToFIPmtStsReq_TxInf_InstgAgt_BrnchId", t4);
		
		TagsCO tagsCO = new TagsCO();
		tagsCO.setName("Id");
		tagsCO.setValue("123");
		data.put("FIToFIPmtStsReq_TxInf_InstgAgt_BrnchId_Id", tagsCO);
		
		TagsCO tagsCO1 = new TagsCO();
		tagsCO1.setName("Nm");
		tagsCO1.setValue("11");
		data.put("FIToFIPmtStsReq_TxInf_InstgAgt_BrnchId_Nm", tagsCO1);
		
		TagsCO tagsCO3 = new TagsCO();
		tagsCO3.setName("LEI");
		tagsCO3.setValue("22");
		data.put("FIToFIPmtStsReq_TxInf_InstgAgt_BrnchId_LEI", tagsCO3);
		
		
		TagsCO tagsCO5 = new TagsCO();
		tagsCO5.setName("StsReqId");
		tagsCO5.setValue("44");
		data.put("FIToFIPmtStsReq_TxInf_StsReqId", tagsCO5);
		
		TagsCO tagsCO6 = new TagsCO();
		tagsCO6.setName("AccptncDtTm");
		tagsCO6.setValue("44");
		data.put("FIToFIPmtStsReq_TxInf_AccptncDtTm", tagsCO6);
		
		TagsCO tagsCO7 = new TagsCO();
		tagsCO7.setName("ClrSysRef");
		tagsCO7.setValue("55");
		data.put("FIToFIPmtStsReq_TxInf_ClrSysRef", tagsCO7);
		

		TagsCO t5 = new TagsCO();
		t5.setName("SplmtryData");
		t5.setValue("null");
		data.put("FIToFIPmtStsReq_SplmtryData", t5);
		
		TagsCO tagsCO9 = new TagsCO();
		tagsCO9.setName("PlcAndNm");
		tagsCO9.setValue("77");
		data.put("FIToFIPmtStsReq_SplmtryData_PlcAndNm", tagsCO9);
		
		TagsCO t6 = new TagsCO();
		t6.setName("GrpHdr");
		t6.setValue("null");
		data.put("FIToFIPmtStsReq_GrpHdr", t6);
		
		TagsCO t7 = new TagsCO();
		t7.setName("InstdAgt");
		t7.setValue("null");
		data.put("FIToFIPmtStsReq_GrpHdr_InstdAgt", t7);
		
		
		TagsCO t8 = new TagsCO();
		t8.setName("FinInstnId");
		t8.setValue("null");
		data.put("FIToFIPmtStsReq_GrpHdr_InstdAgt_FinInstnId", t8);
		
		TagsCO t9 = new TagsCO();
		t9.setName("PstlAdr");
		t9.setValue("null");
		data.put("FIToFIPmtStsReq_GrpHdr_InstdAgt_FinInstnId_PstlAdr", t9);
		
		TagsCO t10 = new TagsCO();
		t10.setName("AdrTpCd");
		t10.setValue("null");
		data.put("FIToFIPmtStsReq_GrpHdr_InstdAgt_FinInstnId_PstlAdr_AdrTp", t10);
		
		
		TagsCO tagsCO10 = new TagsCO();
		tagsCO10.setName("Cd");
		tagsCO10.setValue("88");
		data.put("FIToFIPmtStsReq_GrpHdr_InstdAgt_FinInstnId_PstlAdr_AdrTpCd_Cd", tagsCO10);
	}
	
	/**
	 * Create Nodes
	 * @param nodeName
	 * @param root
	 * @return
	 */
	public static org.w3c.dom.Element createNode(String nodeName, org.w3c.dom.Element root)
	{
		Document document = root.getOwnerDocument();
		// prepare parse element
		org.w3c.dom.Element node = document.createElement(nodeName);
		
		return node;
	}
	
    /**
     * 
     * @param document
     * @return
     * @throws TransformerException
     */
    public static String convertToStr(Document document) throws TransformerException
    {
		TransformerFactory transformerFactory = TransformerFactory.newInstance();
		Transformer transformer = transformerFactory.newTransformer();
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
		transformer.setOutputProperty(OutputKeys.METHOD, "xml");
	
		StringWriter writer = new StringWriter();
		StreamResult result = new StreamResult(writer);
		DOMSource domSource = new DOMSource(document);
		transformer.transform(domSource, result);
	
		return writer.toString();

    }
	
	/**
	 * Parse Schema from uploaded Xsd file or saved schema
	 * @param mxMessageDefinitionCO
	 * @return
	 * @throws IOException
	 * @throws ParserConfigurationException 
	 * @throws TransformerException 
	 */
	public static void parseSchema() throws IOException, ParserConfigurationException, TransformerException 
	{
		File file = new File("E:\\imall project data\\Payment Gateway\\pacs.028.001.04.xsd");
		
		SchemaParser parser = new SchemaParser();
		Schema schema = parser.parse(StringUtil.nullToEmpty(file.getAbsolutePath()));
		
		// Check If Schema is null the return
		if (schema == null)
			return ;

		/**
		 * prepare all complex type
		 */
		types = prepareComplexTypes(schema);

		/**
		 * prepare all simple types
		 */
		types.putAll(prepareSimpleTypes(schema));

		/**
		 * prepare all simple types
		 */
		prepareSimpleTypeData(schema);
		
		/**
		 * get complex type of Document
		 */
		ComplexType sct = schema.getComplexType("Document");

		Sequence sequence = (Sequence) sct.getModel();
		List<com.predic8.schema.Element> elements = sequence.getElements();
		
		/**
		 * generate xml required
		 */
		DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();
		Document document = documentBuilder.newDocument();
		org.w3c.dom.Element root = document.createElement("Document");
		document.appendChild(root);
		
		/**
		 * prepareData
		 */
		HashMap<String, Object> data = new HashMap<String, Object>();
		prepareData(data);
		
		
		List<TagsCo> tagsList = new ArrayList<TagsCo>();
		for (Element element : elements) 
		{
			
			// root element for xml conversion
			org.w3c.dom.Element child = document.createElement(element.getName());
			root.appendChild(child);
			
			/**
			 * if the type is complex type then call tags recursion
			 */
			if (types.get(element.getType().toString().replaceAll("^\\{(.*?)\\}", "")).equals(COMPLEX_TYPE)) {
				/**
				 * call recursion while the type is complex
				 */
				HashMap<String, Object> params = new HashMap<>();
				params.put("schema", schema);
				params.put("parentTag", element.getName());
				params.put("elementType", element.getType().toString().replaceAll("^\\{(.*?)\\}", ""));
				
				/**
				 * xml required hashmap
				 */
				params.put("document", document);
				params.put("element", child);
				params.put("data", data);

				/**
				 * visit all childs tags from xsd and
				 * add into the list
				 */
				visitAllChildTags(params, tagsList);
			}
		}
		System.out.println(convertToStr(document));
	}
		
		
	
		/**
		 * 
		 * @param id
		 * @param parentTag = this is parent tag if the type contains tag
		 * @param ctype     = complex type object
		 * @param stype     = simple type object
		 * @param tagsList  = taglist where every tag will be add
		 */
		private static void visitAllChildTags(HashMap<String, Object> additionalParams, List<TagsCo> tagsList) 
		{
			//String parentId = (String) additionalParams.get("parentId");
			Schema schema = (Schema) additionalParams.get("schema");
			String parentTag = (String) additionalParams.get("parentTag");
			String elementType = (String) additionalParams.get("elementType");
			String hierarchy = additionalParams.containsKey("hierarchy") ? (String) additionalParams.get("hierarchy") : "";
			HashMap<String, Object> tagsDataMap = (HashMap<String, Object>) additionalParams.get("data");
			
			/**
			 *  For Xml Generation
			 *  root element for xml conversion
			 */
			Document  document = (Document) additionalParams.get("document");
			org.w3c.dom.Element root = (org.w3c.dom.Element) additionalParams.get("element");
			
			
			ComplexType ctype = null;
			
			/**
			 * check in this round have type is complex type
			 * then get the complex type object from schema
			 */
			if (types.get(elementType).equals(COMPLEX_TYPE)) 
			{
				ctype = schema.getComplexType(elementType);
			}

			//map for add the complext type objects
			HashMap<String, ComplexType> ctMap = new HashMap<String, ComplexType>();
			
			if (ctype != null) 
			{
				List<Element> elements = new ArrayList<Element>();

				/**
				 * get elements from Sequence and Choice
				 */
				if (ctype.getModel() instanceof Sequence) 
				{
					Sequence sequence = (Sequence) ctype.getModel();
					elements = sequence.getElements();
				} else if (ctype.getModel() instanceof Choice) 
				{
					Choice choice = (Choice) ctype.getModel();
					elements = choice.getElements();
				}

				/**
				 * iterate all elements
				 */
				for (Element element : elements) 
				{
				
					String eType = element.getType().toString().replaceAll("^\\{(.*?)\\}", "");
					
					if (types.get(eType) != null &&  
							types.get(eType).equals(COMPLEX_TYPE)) 
					{
						// @todochange
						ctMap.put(element.getName() + "-" + (StringUtil.isEmptyString(hierarchy) ? parentTag : hierarchy + "_" + parentTag),
								schema.getComplexType(eType));
					} else 
					{
						/**
						 *  For Xml Generation
						 *  create nodes and append in root element
						 *  
						 *  If the hierarchy of tag is available in the data map 
						 *  then create the node for xml
						 */
						if(tagsDataMap.containsKey(StringUtil.isEmptyString(hierarchy) ? parentTag : hierarchy + "_" + parentTag+"_"+element.getName()))
						{
							org.w3c.dom.Element e = createNode(element.getName(), root);
							root.appendChild(e);
						}
					}
				}

				/**
				 * if there is no any complex type then return back
				 */
				if (null == ctMap || ctMap.size() <= 0)
					return;

				/**
				 * Visit all child tags which complex types
				 */
				for (Map.Entry<String, ComplexType> entry : ctMap.entrySet()) 
				{
					if (!parentTag.equals(entry.getKey())) {
						parentTag = entry.getKey();
					}

					
					String data[] = parentTag.split("-");
					parentTag = data[0];
					String tagHierrchy = data[1];

					org.w3c.dom.Element child = null;
					
					/**
					 * Complex type is consider as parent tag in xml file
					 * Checking the hierarchy of tag from datamap (i.e tagsDataMap)
					 * if available then create the element and add into root in xml
					 */
					if(tagsDataMap.containsKey(StringUtil.isEmptyString(tagHierrchy) ? parentTag : tagHierrchy+"_"+parentTag)
							&& root != null)
					{
						child = document.createElement(parentTag);
						root.appendChild(child);
					}
					
					
					/**
					 * Check the complex type details
					 * either it is sequence or Choice
					 */
					ComplexType complexType = entry.getValue();
					List<Element> e = new ArrayList<Element>();

					if (complexType.getModel() instanceof Sequence) {
						Sequence sequence = (Sequence) complexType.getModel();
						e = sequence.getElements();
					} else if (complexType.getModel() instanceof Choice) {
						Choice choice = (Choice) complexType.getModel();
						e = choice.getElements();
					}

					for (Element element : e) 
					{
						String eType = element.getType().toString().replaceAll("^\\{(.*?)\\}", "");
						
						if (types.get(eType).equals(COMPLEX_TYPE)) 
						{

							/**
							 * Fill Hashmap for recursive mehtod 
							 * required parameters
							 */
							HashMap<String, Object> params = new HashMap<>();
							params.put("schema", schema); // schema
							params.put("parentTag", element.getName()); //parent tag
							params.put("elementType", eType); // element type
							params.put("hierarchy", tagHierrchy + "_" + parentTag);  // hierarchy
							
							params.put("document", document); // xml document
							params.put("data", tagsDataMap); // data which required to match
							
							org.w3c.dom.Element childCNode = null;
							
							/**
							 * Complex type is consider as parent tag in xml file
							 * Checking the hierarchy of tag from datamap (i.e tagsDataMap)
							 * if available then create the element and add into root in xml
							 */
							if(tagsDataMap.containsKey(StringUtil.isEmptyString(tagHierrchy) ? parentTag : 
								tagHierrchy + "_" + parentTag+"_"+element.getName())
									&& child != null)
							{
								childCNode = document.createElement(element.getName());
								child.appendChild(childCNode);
							}
							
							params.put("element", childCNode); // parent node of xml

							/**
							 * call recursion method to visit child tags if the type is complext type
							 */
							visitAllChildTags(params, tagsList);

						} else 
						{
								
								/**
								 *  For Xml Generation
								 *  create nodes and append in root element
								 *  
								 *  If the hierarchy of tag is available in the data map 
								 *  then create the node for xml
								 */
								org.w3c.dom.Element childCNode = null;
								if(tagsDataMap.containsKey(StringUtil.isEmptyString(tagHierrchy) ? 
										parentTag : tagHierrchy + "_" + parentTag+"_"+element.getName())
										&& child != null)
								{
									childCNode = createNode(element.getName(), child);
									child.appendChild(childCNode);
								}
							}
						}
					}
				}
			}
	
	
	/**
	 * Prepare All Complex Types
	 * 
	 * @param schema
	 * @return
	 */
	private static HashMap<String, String> prepareComplexTypes(Schema schema) {
		HashMap<String, String> map = new HashMap<String, String>();

		if (null == schema.getComplexTypes())
			return map;

		for (ComplexType complexType : schema.getComplexTypes()) {
			map.put(complexType.getName(), "complexType");
		}
		return map;
	}

	/**
	 * Prepare All Simple Types
	 * 
	 * @param schema
	 * @return
	 */
	private static HashMap<String, String> prepareSimpleTypes(Schema schema) {
		HashMap<String, String> map = new HashMap<String, String>();

		if (null == schema.getSimpleTypes() || schema.getSimpleTypes().size() <= 0)
			return map;

		for (SimpleType st : schema.getSimpleTypes()) {
			map.put(st.getName(), "simpleType");
		}
		return map;
	}

	/**
	 * prepare All Simple Types
	 * 
	 * @param schema
	 * @return
	 */
	public static HashMap<String, SimpleTypeCO> prepareSimpleTypeData(Schema schema) {
		map = new HashMap<String, SimpleTypeCO>();

		if (null == schema.getSimpleTypes() || schema.getSimpleTypes().size() <= 0)
			return map;

		for (SimpleType st : schema.getSimpleTypes()) {
			SimpleTypeCO co = new SimpleTypeCO();

			// set simple type name
			co.setTypeName(st.getName());

			// set Restrictions
			BaseRestriction restriction = (BaseRestriction) st.getRestriction();

			// set restriction type like xs:decimal
			co.setRestrictionType(restriction.getBase().getQualifiedName());

			// get all facets
			List<Facet> facets = restriction.getFacets();
			List<String> enums = new ArrayList<String>();
			if (null != facets) {
				for (Facet facet : facets) {
					/**
					 * if facet is object of PatternFacet then get value from facet object and set
					 * in co variable
					 */
					if (facet instanceof PatternFacet) {
						co.setPattern(facet.getValue());
					}

					/**
					 * if facet is object of EnumerationFacet then get value from facet object and
					 * set in co variable
					 */
					else if (facet instanceof EnumerationFacet) {
						enums.add(facet.getValue());
					}

					/**
					 * if facet is object of FractionDigits then get value from facet object and set
					 * in co variable
					 */
					else if (facet instanceof FractionDigits) {
						co.setFractionDigits(facet.getValue());
					}

					/**
					 * if facet is object of TotalDigitsFacet then get value from facet object and
					 * set in co variable
					 */
					else if (facet instanceof TotalDigitsFacet) {
						co.setTotalDigits(facet.getValue());
					}

					/**
					 * if facet is object of MinInclusiveFacet then get value from facet object and
					 * set in co variable
					 */
					else if (facet instanceof MinInclusiveFacet) {
						co.setMinInclusive(facet.getValue());
					}

					/**
					 * if facet is object of MaxInclusiveFacet then get value from facet object and
					 * set in co variable
					 */
					else if (facet instanceof MaxInclusiveFacet) {
						co.setMaxInclusive(facet.getValue());
					}

					/**
					 * if facet is object of MinExclusiveFacet then get value from facet object and
					 * set in co variable
					 */
					else if (facet instanceof MinExclusiveFacet) {
						co.setMinExclusive(facet.getValue());
					}

					/**
					 * if facet is object of MaxExclusiveFacet then get value from facet object and
					 * set in co variable
					 */
					else if (facet instanceof MaxExclusiveFacet) {
						co.setMaxExclusive(facet.getValue());
					}

					/**
					 * if facet is object of MinLengthFacet then get value from facet object and set
					 * in co variable
					 */
					else if (facet instanceof MinLengthFacet) {
						co.setMinLength(facet.getValue());
					}

					/**
					 * if facet is object of MaxLengthFacet then get value from facet object and set
					 * in co variable
					 */
					else if (facet instanceof MaxLengthFacet) {
						co.setMaxLength(facet.getValue());
					}

					/**
					 * if facet is object of LengthFacet then get value from facet object and set in
					 * co variable
					 */
					else if (facet instanceof LengthFacet) {
						co.setLength(facet.getValue());
					}

					/**
					 * if facet is object of WhiteSpaceFacet then get value from facet object and
					 * set in co variable
					 */
					else if (facet instanceof WhiteSpaceFacet) {
						co.setWhiteSpace(facet.getValue());
					}
				}
				co.setEnumValues(enums);
			}
			map.put(st.getName(), co);
		}
		return map;
	}
	
	public static void main(String[] args) throws IOException, ParserConfigurationException, TransformerException 
	{
		parseSchema();
	}

}
