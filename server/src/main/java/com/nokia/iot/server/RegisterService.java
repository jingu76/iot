package com.nokia.iot.server;

//import org.springframework.http.RequestEntity;
import org.apache.commons.httpclient.methods.PutMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Enumeration;

import java.io.BufferedReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PutMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.io.IOUtils;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.PutMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONObject;

@RestController
public class RegisterService {

    @RequestMapping("/register")
    public String Register(HttpServletRequest request, HttpServletResponse response, BufferedReader reader) throws IOException {
        String resStr = null;
        String wsdl = "http://52.80.95.56:8000/m2m/applications/registration";
        System.out.println(wsdl);
        HttpClient htpClient = new HttpClient();
        PutMethod putMethod = new PutMethod(wsdl);

        putMethod.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");
        putMethod.getParams().setParameter(HttpMethodParams.SO_TIMEOUT, 5000);
        putMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler());

        putMethod.addRequestHeader( "Content-Type","application/json" );
        putMethod.addRequestHeader( "Accept", "application/json");
        putMethod.addRequestHeader("Authorization", "Basic dGVzdGh6ZWRnZTp0ZXN0SHplZGdlITIz");

        String body = "{\r\n\"url\":\"http://106.14.141.134:2600/callback\",\r\n\"headers\": {\"authorization\":\"Basic dGVzdGh6ZWRnZTp0ZXN0SHplZGdlITIz\"}\r\n}";
        putMethod.setRequestBody(body);

        try {
            int statusCode = htpClient.executeMethod(putMethod);
            System.out.println("statusCode:" + statusCode);
            String resp = putMethod.getResponseBodyAsString();
            System.out.println(resp);
            if (statusCode != HttpStatus.SC_OK) {
                System.out.println("Method failed: " + putMethod.getStatusLine());
                return null;
            }
            byte[] responseBody = putMethod.getResponseBody();
            resStr = new String(responseBody, "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            putMethod.releaseConnection();
        }
        System.out.println(resStr.toString());
        putMethod.releaseConnection();

        return resStr;
    }
}
