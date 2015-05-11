

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation cl2ass getTicketList
 */
@WebServlet("/getTicketList")
public class getTicketList extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getTicketList() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		

		Gson gson = new Gson();

		DataTableBean bean = new DataTableBean();
		bean.setDraw(1);
		bean.setRecordsTotal(53);


			bean.setRecordsFiltered(53);
		
			List<Ticket> ticket =new ArrayList<Ticket>();
			
			
			Ticket t1=new Ticket();
			t1.setAgenetName("ss");
			t1.setCustomerName("xdzfd");
			t1.setTicketId(1);
			t1.setDescription("dsfd");
			t1.setSubject("subbbb");
			t1.setPriority("dfsd");
			t1.setStatus("open");
			
			
			
			Ticket t2=new Ticket();
			t2.setAgenetName("ss");
			t2.setCustomerName("xdzfd");
			t2.setTicketId(2);
			t2.setDescription("dsfd");
			t2.setSubject("subbbb");
			t2.setPriority("dfsd");
			t2.setStatus("open");
			
			
			
			
			Ticket t3=new Ticket();
			t3.setAgenetName("ss");
			t3.setCustomerName("xdzfd");
			t3.setTicketId(3);
			t3.setDescription("dsfd");
			t3.setSubject("subbbb");
			t3.setPriority("dfsd");
			t3.setStatus("open");
			
			
			
			ticket.add(t1);
			ticket.add(t2);
			ticket.add(t3);

			bean.setData(ticket);

			
			String json = gson.toJson(bean);
	
			PrintWriter out = response.getWriter();
			out.println(json);

		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
