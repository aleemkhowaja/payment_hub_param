package com.path.payh.bo.mxmessagedefinition;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class XmlParser {

	public static String getParentHierarchy(String hierarchy, Node childNode)
	{
		if(childNode.getParentNode() != null 
				&& !childNode.getParentNode().getNodeName().toLowerCase().contains("document"))
		{
			hierarchy+=childNode.getParentNode().getNodeName()+"_";
			hierarchy = getParentHierarchy(hierarchy, childNode.getParentNode());
		}
		return hierarchy;
	}
	
	public static void main(String[] args) {
		// Pick off the XML file name from the command-line arguments.
		try {
		File file  = new File("E:\\imall project data\\Payment Gateway\\pac8.xml");
	   
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document document =  builder.parse(file);
		Element root = document.getDocumentElement();
		
		List<Node> leafNodes = new ArrayList<Node>();
		
		NodeList nList = document.getElementsByTagName("Document");
		
		visitChildNodes(nList, leafNodes);
		
/*		traverse(root, leafNodes); */
		
		for(Node n : leafNodes)
		{
			String hierarchy = "";
			hierarchy = getParentHierarchy(hierarchy, n.getParentNode());
			
			String splittedParent[] = hierarchy.split("_");
			String finalHierarchy = "";
			for(int i=splittedParent.length-1; i>=0; i--)
			{
				finalHierarchy+=splittedParent[i];
				
				if(i != 0) finalHierarchy+="_";
			}

				
			System.out.println(finalHierarchy+"----"+n.getParentNode().getNodeName() + " --- "+ n.getNodeValue());
		}
		
		} catch (SAXException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
/*		Schema schema = null;
		try {
		  String language = XMLConstants.W3C_XML_SCHEMA_NS_URI;
		  SchemaFactory factory = SchemaFactory.newInstance(language);
		  schema = factory.newSchema(new File(name));
		} catch (Exception e) {
		    e.printStackStrace();
		}
		Validator validator = schema.newValidator();
		validator.validate(new DOMSource(document));*/
		
		
	}
	
	//This function is called recursively
	   private static void visitChildNodes(NodeList nList, List<Node> leafNodes)
	   {
	      for (int temp = 0; temp < nList.getLength(); temp++)
	      {
	         Node node = nList.item(temp);
	         
	         //System.out.println("Node Name = " + node.getNodeName() + "---"+node.getNodeType());
	         
	         if (node.getNodeType() == Node.TEXT_NODE)
	         {
	        	 if(node.getNodeValue() != null && !node.getNodeValue().trim().equals(""))
	        	 {
	        		 leafNodes.add(node);
	        	 }
//	        	 System.out.println(node.getParentNode().getParentNode().getNodeName() +"--"+node.getParentNode().getNodeName()+"::Node Name = " + node.getNodeName() + "; "
//		            		+ "Value = " + node.getNodeValue()+"---"+node.hasChildNodes());
	         }
	         else
	        	 
	         if (node.getNodeType() == Node.ELEMENT_NODE)
	         {
//	            System.out.println("Node Name = " + node.getNodeName() + "; "
//	            		+ "Value = " + node.getNodeValue()+"---"+node.hasChildNodes());
	            //Check all attributes
	            //if (node.hasAttributes()) {
	               // get attributes names and values
	               NamedNodeMap nodeMap = node.getAttributes();
//	               for (int i = 0; i < nodeMap.getLength(); i++)
//	               {
//	                   Node tempNode = nodeMap.item(i);
//	                   System.out.println("Attr name : " + tempNode.getNodeName()+ "; Value = " + tempNode.getNodeValue());
//	               }
	               if (node.hasChildNodes()) 
	               {
	                  //We got more childs; Let's visit them as well
	                  visitChildNodes(node.getChildNodes(), leafNodes);
	               }
	           //}
	         }
	      }
	   }
	// Traverse a subtree whose root is the parameter.

	  public static void traverse (Node n, List<Node> leafNodes)
	  {
	    // Extract node info:
	    String nodename = n.getNodeName();
	    String valueStr = n.getNodeValue();
	    
	    
	    System.out.println(nodename +"==="+valueStr);
	     
	    if(!n.hasChildNodes() && !nodename.equals("#text"))
	    {
	    	leafNodes.add(n);
	    }
	    
	    // Print and continue traversing.
	    //System.out.println ("Node: " + n.getNodeName() + " value=[" + valueStr + "]"+n.hasChildNodes());

	    // Now traverse the rest of the tree in depth-first order.
	    if (n.hasChildNodes()) 
	    {
	      // Get the children in a list.
	      NodeList nl = n.getChildNodes();
	      // How many of them?
	      int size = nl.getLength();
	      for (int i=0; i<size; i++)
	        // Recursively traverse each of the children.
	    	  traverse (nl.item(i), leafNodes);
	    }
	  }

}
