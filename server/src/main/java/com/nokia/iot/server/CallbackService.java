package com.nokia.iot.server;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import redis.clients.jedis.Jedis;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Enumeration;

@RestController
public class CallbackService {
    /**
     * This is the mandatory method, acting as the entry for all the
     * subscriptions and the come from IMPACT.
     *
     * When registration, IMPACT will check this service availability according
     * to the url in the registration request body.
     *
     * @Param  request  The request message from IMPACT
     * @Param  response  The response to be send back to IMAPCT
     * @Param  reader  The request body if any from IMPACT
     *
     * @return  the HTTP response code value.
     */
    @RequestMapping("/callback")
    public String callback(HttpServletRequest request, HttpServletResponse response, BufferedReader reader) throws IOException {
        String str = null;
        String body = "";
        String body_dummy = "";
        BufferedReader br = null;

        while ((str = reader.readLine()) != null) {
            body += str;
        }

        Enumeration<?> en = request.getHeaderNames();
        System.out.println("\nREQ headers & parameters:");
        while (en.hasMoreElements()) {
            String key = (String) en.nextElement();
            String value = request.getHeader(key);
            System.out.println("\t" + key + " = " + value);
        }

        Enumeration<?> pa = request.getParameterNames();
        while (pa.hasMoreElements()) {
            String key = (String) pa.nextElement();
            String value = request.getParameter(key);
            System.out.println("\t" + key + " = " + value);
        }

        System.out.println("REQ body :");
        System.out.println(body);

        if (!(body.isEmpty())) {

            JSONObject myJsonObject = new JSONObject(body);
            JSONArray myArray = myJsonObject.getJSONArray("responses");

            String serialNumber = "";

            Jedis edis = new Jedis("localhost");
            System.out.println(edis.ping());

            for (int i = 0; i < myArray.length(); i++) {
                JSONObject job = myArray.getJSONObject(i);
                serialNumber = job.get("serialNumber").toString();
                System.out.println("serialNumber:" + job.get("serialNumber"));
                System.out.println("job:" + job);
                edis.set(serialNumber, job.toString());
            }
        }else {
            return "Body is Empty, OK";
        }
        return "Callback Unkown Type, OK";
    }

    @RequestMapping("/callback2")
    public String callback2(HttpServletRequest request, HttpServletResponse response, BufferedReader reader) throws IOException {
        String str = null;
        String body = "";
        String body_dummy = "";
        BufferedReader br = null;
        /* 文件模拟数据, 将来需要删除 */
//        try {
//
//            String pathPrefix = ResourceUtils.getURL("classpath:").getPath();
//            File file = new File(pathPrefix);
//            if(!file.exists()) file = new File("");
//            System.out.println("file path:"+file.getAbsolutePath());
//
//
//            br = new BufferedReader(new FileReader("edge_lwm2m.txt"));
//            // The first way of reading the file
//            System.out.println("-read file->\r\n\r\n");
//            String contentLine = br.readLine();
//            while (contentLine != null) {
//                //System.out.println(contentLine);
//                body_dummy += contentLine;
//                contentLine = br.readLine();
//            }
//        }catch(Exception e){
//            e.printStackTrace();
//        }
//        System.out.println(body_dummy);

        while ((str = reader.readLine()) != null) {
            body += str;
        }

        JSONObject myJsonObject = new JSONObject(body_dummy);
        JSONArray myArray = myJsonObject.getJSONArray("responses");

        String serialNumber = "";

        Jedis edis = new Jedis("localhost");
        System.out.println(edis.ping());

        for (int i = 0; i < myArray.length(); i++) {
            JSONObject job = myArray.getJSONObject(i);
            serialNumber = job.get("serialNumber").toString();
            System.out.println("serialNumber:"+job.get("serialNumber")) ;
            System.out.println("job:"+job);
            edis.set(serialNumber, job.toString());

        }

        ///push to

        //add monogdb

        Enumeration<?> en = request.getHeaderNames();
        System.out.println("\nREQ headers & parameters:");
        while (en.hasMoreElements()) {
            String key = (String) en.nextElement();
            String value = request.getHeader(key);
            System.out.println("\t" + key + " = " + value);
        }

        Enumeration<?> pa = request.getParameterNames();
        while (pa.hasMoreElements()) {
            String key = (String) pa.nextElement();
            String value = request.getParameter(key);
            System.out.println("\t" + key + " = " + value);
        }

        System.out.println("REQ body :");
        System.out.println(body);

        /* 需要在这里提取 report 数据,存入redis 数据库
           所有的客户端订阅，按照组名和serialNumber订阅
         */

        return "OK";
    }
}
