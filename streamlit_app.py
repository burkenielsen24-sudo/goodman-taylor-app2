"""
Goodman Taylor App - Production Dashboard
A multi-purpose business application dashboard built with Streamlit
"""

import streamlit as st
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Page configuration
st.set_page_config(
    page_title="Goodman Taylor Dashboard",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
    <style>
    .main {
        padding: 0rem 1rem;
    }
    .stMetric {
        background-color: #f0f2f6;
        padding: 1rem;
        border-radius: 0.5rem;
    }
    </style>
    """, unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.title("📊 Dashboard Navigation")
    st.markdown("---")
    
    page = st.radio(
        "Select a page:",
        ["Overview", "Analytics", "Reports", "Settings"]
    )
    
    st.markdown("---")
    st.info("**Version:** 2.0.0\n\n**Last Updated:** " + datetime.now().strftime("%Y-%m-%d"))

# Main content
st.title("🏢 Goodman Taylor Business Dashboard")
st.markdown("### Multi-Purpose Business Application - Version 2")

if page == "Overview":
    st.header("📈 Business Overview")
    
    # Metrics row
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(
            label="Total Revenue",
            value="$125,430",
            delta="12.5%"
        )
    
    with col2:
        st.metric(
            label="Active Projects",
            value="47",
            delta="5"
        )
    
    with col3:
        st.metric(
            label="Team Members",
            value="23",
            delta="2"
        )
    
    with col4:
        st.metric(
            label="Completion Rate",
            value="94%",
            delta="3%"
        )
    
    st.markdown("---")
    
    # Chart sections
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📊 Monthly Performance")
        
        # Generate sample data
        dates = pd.date_range(
            start=datetime.now() - timedelta(days=90),
            end=datetime.now(),
            freq='D'
        )
        chart_data = pd.DataFrame({
            'Date': dates,
            'Revenue': np.cumsum(np.random.randn(len(dates)) * 1000 + 5000)
        }).set_index('Date')
        
        st.line_chart(chart_data)
    
    with col2:
        st.subheader("📋 Project Status")
        
        status_data = pd.DataFrame({
            'Status': ['Completed', 'In Progress', 'Planning', 'On Hold'],
            'Count': [28, 12, 5, 2]
        })
        
        st.bar_chart(status_data.set_index('Status'))
    
    st.markdown("---")
    
    # Recent activity
    st.subheader("🔔 Recent Activity")
    
    activities = [
        {"time": "2 hours ago", "action": "New project 'Digital Transformation' started"},
        {"time": "5 hours ago", "action": "Project 'Website Redesign' completed"},
        {"time": "1 day ago", "action": "Team member Sarah joined"},
        {"time": "2 days ago", "action": "Monthly report generated"},
    ]
    
    for activity in activities:
        st.text(f"⏰ {activity['time']} - {activity['action']}")

elif page == "Analytics":
    st.header("📊 Advanced Analytics")
    
    st.info("📌 This section provides detailed analytics and insights.")
    
    # Sample analytics data
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Performance Trends")
        
        trend_data = pd.DataFrame(
            np.random.randn(20, 3),
            columns=['Metric A', 'Metric B', 'Metric C']
        )
        st.area_chart(trend_data)
    
    with col2:
        st.subheader("Distribution Analysis")
        
        dist_data = pd.DataFrame({
            'Category': ['A', 'B', 'C', 'D', 'E'],
            'Value': np.random.randint(10, 100, 5)
        })
        st.bar_chart(dist_data.set_index('Category'))

elif page == "Reports":
    st.header("📄 Reports & Documentation")
    
    st.info("📌 Generate and view business reports.")
    
    report_type = st.selectbox(
        "Select Report Type",
        ["Monthly Summary", "Quarterly Review", "Annual Report", "Custom Report"]
    )
    
    date_range = st.date_input(
        "Select Date Range",
        value=(datetime.now() - timedelta(days=30), datetime.now())
    )
    
    if st.button("Generate Report", type="primary"):
        with st.spinner("Generating report..."):
            import time
            time.sleep(1)
            st.success(f"✅ {report_type} generated successfully!")
            
            # Sample report data
            st.subheader("Report Summary")
            
            report_data = pd.DataFrame({
                'Metric': ['Revenue', 'Projects', 'Clients', 'Tasks'],
                'This Period': [125430, 47, 89, 342],
                'Last Period': [112500, 42, 85, 318],
                'Change (%)': [11.5, 11.9, 4.7, 7.5]
            })
            
            st.dataframe(report_data, use_container_width=True)

elif page == "Settings":
    st.header("⚙️ Settings & Configuration")
    
    st.info("📌 Configure your dashboard preferences.")
    
    with st.expander("General Settings", expanded=True):
        st.text_input("Company Name", value="Goodman Taylor Inc.")
        st.text_input("Email", value="contact@goodmantaylor.com")
        st.selectbox("Timezone", ["UTC", "EST", "PST", "GMT"])
    
    with st.expander("Display Settings"):
        st.checkbox("Dark Mode", value=False)
        st.checkbox("Show Notifications", value=True)
        st.slider("Refresh Interval (seconds)", 30, 300, 60)
    
    with st.expander("Data Settings"):
        st.checkbox("Auto-save", value=True)
        st.selectbox("Export Format", ["CSV", "Excel", "PDF"])
    
    if st.button("Save Settings", type="primary"):
        st.success("✅ Settings saved successfully!")

# Footer
st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: gray; padding: 1rem;'>
        <p>© 2025 Goodman Taylor App v2.0 | Built with Streamlit 🎈</p>
    </div>
    """,
    unsafe_allow_html=True
)
