import com.sun.net.httpserver.HttpServer;
import handlers.RequestHandler;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;

public class Application {

    private static final String SERVER_PORT = "8080";
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(Integer.parseInt(SERVER_PORT)), 0);
        server.createContext("/api", new RequestHandler());
        server.setExecutor(Executors.newFixedThreadPool(10));
        server.start();
        System.out.println("Server started on port: " + SERVER_PORT);
    }
}
