# Contoso Robotics -- Product and Support Knowledge Base

## Company Overview

Contoso Robotics is a mid-size robotics manufacturer headquartered in Austin, Texas. Founded in 2014, the company employs approximately 500 people and generates $120M in annual revenue. CEO Maria Chen leads the organization with a focus on warehouse and logistics automation. Contoso serves over 200 enterprise customers across North America, including major third-party logistics providers, e-commerce fulfillment centers, and manufacturing distribution hubs.

## Product Line

### WarehouseBot Pro

**Category:** Autonomous mobile robot (AMR) for large-scale warehouse operations

**Specifications:**

- Payload capacity: 1,500 lbs
- Navigation: LiDAR + vision fusion, dynamic obstacle avoidance
- Battery: 48V lithium-ion, 12-hour continuous runtime, 90-minute fast charge
- Speed: Up to 6.5 ft/s loaded
- Integration: REST API, WMS connectors for SAP, Oracle, and Manhattan Associates
- Dimensions: 48 x 36 x 18 inches

**Pricing:** Starting at $85,000 per unit. Volume discounts available for orders of 10+ units. Annual maintenance contract: $8,500 per unit.

**Ideal for:** Distribution centers over 100,000 sq ft handling 5,000+ picks per day.

### WarehouseBot Lite

**Category:** Compact AMR for small-to-medium warehouse operations

**Specifications:**

- Payload capacity: 600 lbs
- Navigation: LiDAR with 2D mapping
- Battery: 24V lithium-ion, 8-hour continuous runtime, 2-hour standard charge
- Speed: Up to 4.5 ft/s loaded
- Integration: REST API, basic WMS integration via CSV import/export
- Dimensions: 36 x 24 x 14 inches

**Pricing:** Starting at $42,000 per unit. Volume discounts available for orders of 5+ units. Annual maintenance contract: $4,200 per unit.

**Ideal for:** Warehouses between 20,000 and 100,000 sq ft with moderate throughput requirements.

### LogiMover 500

**Category:** Autonomous tugger for inter-facility material transport

**Specifications:**

- Towing capacity: 5,000 lbs (up to 10 carts in a train)
- Navigation: GPS + indoor LiDAR hybrid for indoor/outdoor transitions
- Battery: 72V lithium-ion, 16-hour runtime, supports opportunity charging
- Speed: Up to 8 ft/s unloaded, 5 ft/s loaded
- Integration: Fleet management dashboard, REST API, Modbus for conveyor integration
- Dimensions: 60 x 30 x 24 inches

**Pricing:** Starting at $125,000 per unit. Custom configurations available. Annual maintenance contract: $12,500 per unit.

**Ideal for:** Campus-style facilities, manufacturing plants, and airport logistics requiring material movement between buildings.

## Support Policies

**Standard Support** is included with every active maintenance contract:

- Business hours: Monday through Friday, 7:00 AM to 7:00 PM Central Time
- Response time: Within 4 business hours for critical issues, within 1 business day for standard requests
- Channels: Phone (512-555-0100), email (support@contosorobotics.com), and the Contoso Support Portal

**Premium Support** is available as an add-on ($3,000/unit/year):

- 24/7 coverage including weekends and holidays
- Response time: Within 1 hour for critical issues
- Dedicated support engineer assigned to your account
- Quarterly on-site health checks

**Escalation path:** Tier 1 (general support) handles product questions and basic troubleshooting. Unresolved issues escalate to Tier 2 (technical engineering) within 2 hours. Critical system-down issues escalate directly to the on-call engineering team.

## Warranty Terms

All Contoso Robotics products include a **2-year limited warranty** from the date of delivery:

- Covers defects in materials and workmanship under normal use
- Includes replacement of faulty sensors, motors, and control boards
- Battery warranty: 2 years or 3,000 charge cycles, whichever comes first
- Does not cover damage from misuse, unauthorized modifications, or operation outside specified environmental conditions (temperature: 32-110 degrees F, humidity: 10-90% non-condensing)

**Extended warranty** options are available at the time of purchase: 3-year ($6,000/unit) or 5-year ($12,000/unit). Extended warranty includes battery replacement at no additional charge if capacity drops below 70% of original rating.

## Return and Refund Policy

- 30-day evaluation period from date of delivery
- Units must be returned in original condition with all accessories
- Restocking fee: 15% for standard returns, waived for defective units
- Refund processed within 10 business days of receiving the returned unit

## Common Troubleshooting

- **Error E-401 (Navigation sensor fault):** Clean LiDAR lens with provided microfiber cloth. If error persists, restart the navigation module via the control panel. Contact support if the error appears more than 3 times in 24 hours.
- **Error E-302 (Battery communication fault):** Power cycle the unit. Check battery connector seating. If the error recurs, the battery management board may need replacement under warranty.
- **Error E-510 (WMS connection timeout):** Verify network connectivity. Confirm WMS API endpoint is reachable. Check firewall rules for port 8443. Restart the integration service from the fleet dashboard.
