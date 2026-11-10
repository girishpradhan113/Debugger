import { BugReport } from '../types/debugger';

// High-resolution SVG Mock Images encoded as Data URIs for offline, self-contained rendering

// 1. UI Flexbox collision SVG mockup
const UI_FLEXBOX_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340" fill="none">
  <rect width="600" height="340" rx="12" fill="#090D16"/>
  <rect x="1" y="1" width="598" height="338" rx="11" stroke="#1E293B" stroke-width="2"/>
  
  <!-- Window Header -->
  <path d="M0 12C0 5.37258 5.37258 0 12 0H588C594.627 0 600 5.37258 600 12V36H0V12Z" fill="#0F172A"/>
  <circle cx="24" cy="18" r="5" fill="#EF4444"/>
  <circle cx="40" cy="18" r="5" fill="#F59E0B"/>
  <circle cx="56" cy="18" r="5" fill="#10B981"/>
  <text x="80" y="22" fill="#64748B" font-family="monospace" font-size="11">viewport: 375px (Mobile Emulation) — Flexbox Boundary Breach</text>

  <!-- Container Bounds Outline -->
  <rect x="30" y="55" width="360" height="255" rx="8" fill="#0B132B" stroke="#3B82F6" stroke-dasharray="4 4" stroke-width="1.5"/>
  <text x="38" y="74" fill="#60A5FA" font-family="sans-serif" font-size="11" font-weight="bold">Parent Container: .metrics-card-row [max-width: 360px]</text>

  <!-- Card 1 (Normal) -->
  <rect x="45" y="90" width="165" height="100" rx="6" fill="#1E293B" stroke="#334155"/>
  <text x="57" y="115" fill="#94A3B8" font-family="sans-serif" font-size="11">Active Nodes</text>
  <text x="57" y="145" fill="#38BDF8" font-family="sans-serif" font-size="22" font-weight="bold">1,842</text>
  <text x="57" y="170" fill="#10B981" font-family="sans-serif" font-size="10">+12.4% vs last hr</text>

  <!-- Card 2 (Colliding / Overflowing) -->
  <rect x="220" y="90" width="220" height="100" rx="6" fill="#1E293B" stroke="#EF4444" stroke-width="2"/>
  <text x="232" y="115" fill="#94A3B8" font-family="sans-serif" font-size="11">Cluster Throughput</text>
  <text x="232" y="145" fill="#F43F5E" font-family="sans-serif" font-size="22" font-weight="bold">98.4 GB/s</text>
  
  <!-- Red Collision Indicator Marker -->
  <rect x="375" y="80" width="85" height="120" rx="4" fill="#EF4444" fill-opacity="0.15" stroke="#EF4444" stroke-width="2" stroke-dasharray="3 3"/>
  <path d="M375 75L375 210" stroke="#EF4444" stroke-width="2"/>
  <text x="390" y="135" fill="#F87171" font-family="sans-serif" font-size="10" font-weight="bold">OVERFLOW</text>
  <text x="390" y="148" fill="#FCA5A5" font-family="sans-serif" font-size="9">+80px clipped</text>

  <!-- Collision Annotation Pill -->
  <rect x="180" y="215" width="260" height="40" rx="6" fill="#450A0A" stroke="#DC2626"/>
  <circle cx="200" cy="235" r="8" fill="#EF4444"/>
  <text x="197" y="239" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">!</text>
  <text x="216" y="232" fill="#FCA5A5" font-family="sans-serif" font-size="11" font-weight="bold">Flex collision detected</text>
  <text x="216" y="246" fill="#FECACA" font-family="sans-serif" font-size="9">Cards enforce min-w:220px without flex-wrap</text>

  <rect x="45" y="265" width="130" height="32" rx="4" fill="#3B82F6"/>
  <text x="75" y="285" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">Inspect DOM</text>
</svg>
`)}`;

// 2. C++ Segfault Terminal Screenshot Mockup
const CPP_SEGFAULT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340" fill="none">
  <rect width="600" height="340" rx="12" fill="#050811"/>
  <rect x="1" y="1" width="598" height="338" rx="11" stroke="#1E293B" stroke-width="2"/>
  
  <!-- Terminal Header -->
  <path d="M0 12C0 5.37258 5.37258 0 12 0H588C594.627 0 600 5.37258 600 12V36H0V12Z" fill="#0A0F1D"/>
  <circle cx="24" cy="18" r="5" fill="#EF4444"/>
  <circle cx="40" cy="18" r="5" fill="#F59E0B"/>
  <circle cx="56" cy="18" r="5" fill="#10B981"/>
  <text x="80" y="22" fill="#64748B" font-family="monospace" font-size="11">gdb ./bin/packet_router (PID 4812) — Crash Signal Dump</text>

  <!-- Crash Dump Lines -->
  <text x="25" y="65" fill="#94A3B8" font-family="monospace" font-size="11">$ ./bin/packet_router --threads=4 --port=8080</text>
  <text x="25" y="85" fill="#38BDF8" font-family="monospace" font-size="11">[INFO] Telemetry Ingestion Engine v2.4 initialized.</text>
  <text x="25" y="105" fill="#38BDF8" font-family="monospace" font-size="11">[INFO] Inbound UDP buffer stream: 128 MB mapped at 0x7ffeeb42a000</text>
  
  <!-- Segfault Highlight Box -->
  <rect x="18" y="120" width="564" height="65" rx="6" fill="#3F0B0B" stroke="#DC2626" stroke-width="1.5"/>
  <text x="30" y="142" fill="#F87171" font-family="monospace" font-size="12" font-weight="bold">Fatal Error: SIGSEGV (Signal 11: Segmentation fault)</text>
  <text x="30" y="160" fill="#FCA5A5" font-family="monospace" font-size="11">Faulting Address: 0x0000000000000000 (Attempted read at NULL)</text>
  <text x="30" y="175" fill="#FECACA" font-family="monospace" font-size="10">RIP: 0x00000000004012e4 in parse_telemetry_payload (packet_parser.cpp:42)</text>

  <!-- Stack Trace -->
  <text x="25" y="210" fill="#F59E0B" font-family="monospace" font-size="11">#0  0x004012e4 in parse_telemetry_payload (header=0x0, len=1024)</text>
  <text x="45" y="226" fill="#E2E8F0" font-family="monospace" font-size="11">&gt; 42: int msg_id = header-&gt;message_id;</text>
  <text x="25" y="246" fill="#94A3B8" font-family="monospace" font-size="11">#1  0x00401490 in dispatch_event (buf=0x7ffeeb42a000) at main.cpp:118</text>
  <text x="25" y="266" fill="#94A3B8" font-family="monospace" font-size="11">#2  0x00401820 in worker_thread_loop (arg=0x1) at thread_pool.cpp:64</text>
  
  <rect x="25" y="285" width="280" height="28" rx="4" fill="#1E293B"/>
  <text x="35" y="303" fill="#A7F3D0" font-family="monospace" font-size="11">Core dump saved to /tmp/core.4812</text>
</svg>
`)}`;

// 3. Python Null Reference Screenshot Mockup
const PYTHON_NULL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340" fill="none">
  <rect width="600" height="340" rx="12" fill="#070A13"/>
  <rect x="1" y="1" width="598" height="338" rx="11" stroke="#1E293B" stroke-width="2"/>
  
  <!-- Header -->
  <path d="M0 12C0 5.37258 5.37258 0 12 0H588C594.627 0 600 5.37258 600 12V36H0V12Z" fill="#0C1322"/>
  <circle cx="24" cy="18" r="5" fill="#EF4444"/>
  <circle cx="40" cy="18" r="5" fill="#F59E0B"/>
  <circle cx="56" cy="18" r="5" fill="#10B981"/>
  <text x="80" y="22" fill="#64748B" font-family="monospace" font-size="11">Sentry / Datadog Exception Ingest — Unhandled NoneType Crash</text>

  <!-- Error Alert Banner -->
  <rect x="20" y="52" width="560" height="52" rx="6" fill="#450A0A" stroke="#DC2626"/>
  <text x="35" y="74" fill="#F87171" font-family="monospace" font-size="13" font-weight="bold">AttributeError: 'NoneType' object has no attribute 'get'</text>
  <text x="35" y="92" fill="#FECACA" font-family="monospace" font-size="11">services.analytics_pipeline in process_event_batch at line 78</text>

  <!-- Code Context -->
  <rect x="20" y="115" width="560" height="155" rx="6" fill="#0F172A" stroke="#334155"/>
  <text x="35" y="140" fill="#64748B" font-family="monospace" font-size="11">76:   for event in batch_records:</text>
  <text x="35" y="158" fill="#64748B" font-family="monospace" font-size="11">77:       payload = event.get("payload")</text>
  
  <rect x="30" y="166" width="540" height="24" fill="#991B1B" fill-opacity="0.35"/>
  <text x="35" y="182" fill="#FCA5A5" font-family="monospace" font-size="11" font-weight="bold">78:       user_tier = payload["user_profile"].get("tier", "free")  # CRASH: payload['user_profile'] is None</text>
  
  <text x="35" y="206" fill="#64748B" font-family="monospace" font-size="11">79:       analytics_sink.emit_metric("user.tier", user_tier)</text>
  <text x="35" y="226" fill="#64748B" font-family="monospace" font-size="11">80:       processed_count += 1</text>
  <text x="35" y="250" fill="#F59E0B" font-family="monospace" font-size="10">Impact: 14,200 events dropped in last 12 minutes (Pipeline halted)</text>

  <rect x="20" y="285" width="220" height="30" rx="4" fill="#2563EB"/>
  <text x="35" y="304" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">Trigger AI Automated Patch</text>
</svg>
`)}`;

export const PRESET_DEMOS: Record<string, BugReport> = {
  '1: UI Flexbox Collision': {
    id: 'demo-ui-flexbox',
    title: '1: UI Flexbox Collision',
    filename: 'src/components/DashboardGrid.html',
    language: 'html',
    mode: 'web',
    severity: 'HIGH',
    category: 'CSS Flexbox Overflow & Viewport Collision',
    confidence: 99.4,
    estimatedFixTime: '< 2 mins',
    rootCause:
      'The container `.stat-row` specifies `display: flex; gap: 16px;` without `flex-wrap: wrap;`. Each `.metric-card` defines a fixed `min-width: 260px;` and `overflow: hidden;` is missing on text containers. On screens < 640px or side-docked panels, child cards forcefully collide horizontally, protruding 110px past the parent boundary and obscuring action buttons.',
    remedySummary:
      'Injected `flex-wrap: wrap;` with dynamic `min-width: 0;` and responsive grid fallback. Added `flex-1 min-w-[200px] max-w-full` so cards wrap gracefully and prevent layout truncation on narrow viewports.',
    mockImageUrl: UI_FLEXBOX_SVG,
    mockImageTitle: 'Mobile Viewport Inspection Screenshot (Flex Collision & Overflow)',
    logs: `[LayoutEngine] Warning: CSS flex item exceeds parent boundary container .stat-row (container width: 360px, computed cards width: 536px)
[LayoutEngine] Horizontal overflow clipped: child element .metric-card-2 causing horizontal overlap with action bar
[ViewportInspector] Layout shift score (CLS): 0.428 (exceeds Google Web Vitals threshold of 0.1)
[Accessibility] Element <button class="action-btn"> has an overlapping bounding rect with .stat-card (element cannot receive click)`,
    buggyCode: `<!-- Buggy Flexbox Component: Container Collides on Mobile/Narrow Screens -->
<div class="metrics-dashboard" style="max-width: 380px; padding: 16px; background: #0f172a; border-radius: 12px; font-family: system-ui;">
  <h2 style="color: #f8fafc; font-size: 16px; margin-bottom: 12px;">Infrastructure Overview</h2>
  
  <!-- BUG: display:flex without flex-wrap causes cards with min-width: 220px to collide and overflow -->
  <div class="stat-row" style="display: flex; gap: 16px; width: 100%;">
    
    <div class="metric-card" style="min-width: 220px; background: #1e293b; padding: 14px; border-radius: 8px; border: 1px solid #334155;">
      <span style="color: #94a3b8; font-size: 12px;">Active Compute</span>
      <div style="color: #38bdf8; font-size: 24px; font-weight: bold; margin-top: 4px;">1,842 nodes</div>
      <div style="color: #10b981; font-size: 11px; margin-top: 4px;">+12.4% vs last hr</div>
    </div>

    <div class="metric-card" style="min-width: 220px; background: #1e293b; padding: 14px; border-radius: 8px; border: 1px solid #ef4444;">
      <span style="color: #94a3b8; font-size: 12px;">Throughput</span>
      <div style="color: #f43f5e; font-size: 24px; font-weight: bold; margin-top: 4px;">98.4 GB/s</div>
      <div style="color: #f87171; font-size: 11px; margin-top: 4px;">Overflowing Boundary</div>
    </div>

  </div>

  <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
    <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">
      Deploy Cluster
    </button>
  </div>
</div>`,
    patchedCode: `<!-- Patched Responsive Component: Fluid Flexbox with Auto-Wrapping & min-w-0 -->
<div class="metrics-dashboard" style="max-width: 380px; padding: 16px; background: #0f172a; border-radius: 12px; font-family: system-ui;">
  <h2 style="color: #f8fafc; font-size: 16px; margin-bottom: 12px;">Infrastructure Overview</h2>
  
  <!-- PATCHED: flex-wrap: wrap ensures responsive reflow without horizontal collision -->
  <div class="stat-row" style="display: flex; flex-wrap: wrap; gap: 12px; width: 100%;">
    
    <div class="metric-card" style="flex: 1 1 160px; min-width: 0; background: #1e293b; padding: 14px; border-radius: 8px; border: 1px solid #334155;">
      <span style="color: #94a3b8; font-size: 12px;">Active Compute</span>
      <div style="color: #38bdf8; font-size: 24px; font-weight: bold; margin-top: 4px;">1,842 nodes</div>
      <div style="color: #10b981; font-size: 11px; margin-top: 4px;">+12.4% vs last hr</div>
    </div>

    <div class="metric-card" style="flex: 1 1 160px; min-width: 0; background: #1e293b; padding: 14px; border-radius: 8px; border: 1px solid #10b981;">
      <span style="color: #94a3b8; font-size: 12px;">Throughput</span>
      <div style="color: #34d399; font-size: 24px; font-weight: bold; margin-top: 4px;">98.4 GB/s</div>
      <div style="color: #6ee7b7; font-size: 11px; margin-top: 4px;">Optimal Bounds Safe</div>
    </div>

  </div>

  <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
    <button style="background: #10b981; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 500;">
      Deploy Cluster (Verified)
    </button>
  </div>
</div>`,
    interactiveBuggyHtml: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #030712; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; }
  .wrapper { width: 340px; border: 2px dashed #ef4444; padding: 12px; background: #090d16; border-radius: 12px; position: relative; }
  .badge { position: absolute; top: -10px; right: 12px; background: #ef4444; color: white; font-size: 10px; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
  .stat-row { display: flex; gap: 12px; }
  .card { min-width: 210px; background: #1e293b; padding: 14px; border-radius: 8px; border: 1px solid #334155; }
  .card.error { border-color: #ef4444; background: #271216; }
</style>
</head>
<body>
  <div class="wrapper">
    <div class="badge">COLLISION BUG</div>
    <p style="color: #94a3b8; font-size: 11px; margin-bottom: 8px;">Simulated Mobile Container [Width: 340px]</p>
    <div class="stat-row">
      <div class="card">
        <div style="color: #94a3b8; font-size: 11px;">Active Nodes</div>
        <div style="color: #38bdf8; font-size: 20px; font-weight: bold; margin-top: 2px;">1,842</div>
      </div>
      <div class="card error">
        <div style="color: #f87171; font-size: 11px;">Throughput (Clipped)</div>
        <div style="color: #f43f5e; font-size: 20px; font-weight: bold; margin-top: 2px;">98.4 GB/s</div>
      </div>
    </div>
  </div>
</body>
</html>`,
    interactivePatchedHtml: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #030712; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; }
  .wrapper { width: 340px; border: 2px solid #10b981; padding: 12px; background: #090d16; border-radius: 12px; position: relative; }
  .badge { position: absolute; top: -10px; right: 12px; background: #10b981; color: white; font-size: 10px; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
  .stat-row { display: flex; flex-wrap: wrap; gap: 12px; width: 100%; }
  .card { flex: 1 1 130px; min-width: 0; background: #1e293b; padding: 14px; border-radius: 8px; border: 1px solid #10b981; }
</style>
</head>
<body>
  <div class="wrapper">
    <div class="badge">PATCHED &amp; VERIFIED</div>
    <p style="color: #94a3b8; font-size: 11px; margin-bottom: 8px;">Simulated Mobile Container [Width: 340px - Wrapped Cleanly]</p>
    <div class="stat-row">
      <div class="card">
        <div style="color: #94a3b8; font-size: 11px;">Active Nodes</div>
        <div style="color: #38bdf8; font-size: 20px; font-weight: bold; margin-top: 2px;">1,842</div>
      </div>
      <div class="card">
        <div style="color: #94a3b8; font-size: 11px;">Throughput</div>
        <div style="color: #34d399; font-size: 20px; font-weight: bold; margin-top: 2px;">98.4 GB/s</div>
      </div>
    </div>
  </div>
</body>
</html>`,
  },

  '2: C++ Pointer Segfault': {
    id: 'demo-cpp-segfault',
    title: '2: C++ Pointer Segfault',
    filename: 'src/network/packet_parser.cpp',
    language: 'cpp',
    mode: 'systems',
    severity: 'CRITICAL',
    category: 'Memory Safety & Null Pointer Dereference',
    confidence: 99.8,
    estimatedFixTime: '< 4 mins',
    rootCause:
      'In `parse_telemetry_payload()`, the function dereferences `header->message_id` on line 42 without checking if `header == nullptr`. When network packets arrive truncated or corrupted from UDP ring buffers, `header` is initialized to 0x0. The CPU generates a hardware trap SIGSEGV (Signal 11) trying to access unmapped physical page 0x0.',
    remedySummary:
      'Added immediate `nullptr` guard check, enforced payload byte size boundary check (`len < sizeof(TelemetryHeader)`), and returned strongly typed `ParseResult::ERR_CORRUPT_PAYLOAD` with RAII memory safety.',
    mockImageUrl: CPP_SEGFAULT_SVG,
    mockImageTitle: 'GDB Crash Trace & Core Dump Telemetry (SIGSEGV Signal 11)',
    logs: `Program received signal SIGSEGV, Segmentation fault.
0x00000000004012e4 in parse_telemetry_payload (header=0x0, len=1024) at packet_parser.cpp:42
42        int packet_id = header->message_id; // CRASH: header is nullptr
[Thread 1 (LWP 4812) exited with code 139 (SIGSEGV)]
#0  0x00000000004012e4 in parse_telemetry_payload (header=0x0, len=1024) at packet_parser.cpp:42
#1  0x0000000000401490 in dispatch_event (buf=0x7ffeeb42a000) at main.cpp:118
#2  0x0000000000401820 in worker_thread_loop (arg=0x1) at thread_pool.cpp:64`,
    buggyCode: `// Buggy C++ Implementation: Raw pointer dereference without null boundary validation
#include <iostream>
#include <cstdint>

struct TelemetryHeader {
    uint32_t message_id;
    uint32_t sequence_num;
    uint32_t payload_size;
};

enum ParseStatus { SUCCESS = 0, ERR_CORRUPT = -1 };

ParseStatus parse_telemetry_payload(const TelemetryHeader* header, size_t len) {
    // CRITICAL BUG: Dereferencing header without verifying != nullptr
    // When incoming UDP socket receives 0 bytes or corrupted packet, header is null!
    int packet_id = header->message_id; // <-- HARD CRASH: SIGSEGV at 0x00000000
    
    if (len < header->payload_size) {
        return ERR_CORRUPT;
    }

    std::cout << "Processing packet #" << packet_id << " (len: " << len << ")\\n";
    return SUCCESS;
}`,
    patchedCode: `// Patched C++ Implementation: Defensive Pointer Validation & Bounds Safety
#include <iostream>
#include <cstdint>
#include <span>
#include <optional>

struct TelemetryHeader {
    uint32_t message_id;
    uint32_t sequence_num;
    uint32_t payload_size;
};

enum class ParseStatus { 
    SUCCESS = 0, 
    ERR_NULL_HEADER = -1, 
    ERR_BUFFER_OVERRUN = -2 
};

ParseStatus parse_telemetry_payload(const TelemetryHeader* header, size_t len) {
    // FIX: Verify pointer address before any memory access
    if (header == nullptr) {
        std::cerr << "[CRITICAL] Rejected null telemetry header at 0x0!\\n";
        return ParseStatus::ERR_NULL_HEADER;
    }

    // FIX: Verify minimum buffer size before dereferencing payload_size
    if (len < sizeof(TelemetryHeader)) {
        std::cerr << "[WARN] Packet buffer length (" << len << "B) smaller than header size\\n";
        return ParseStatus::ERR_BUFFER_OVERRUN;
    }

    uint32_t packet_id = header->message_id;
    if (len < sizeof(TelemetryHeader) + header->payload_size) {
        return ParseStatus::ERR_BUFFER_OVERRUN;
    }

    std::cout << "Successfully parsed packet #" << packet_id << " (safe payload len: " << len << ")\\n";
    return ParseStatus::SUCCESS;
}`,
    memoryRegisters: [
      {
        name: 'header ($RDI)',
        address: '0x0000000000000000',
        buggyValue: '0x0 (NULL POINTER)',
        patchedValue: '0x7ffeeb42a040 (VALID HEAP ADDR)',
        status: 'VIOLATION',
        description: 'Pointer register dereferenced while pointing to unmapped page 0.',
      },
      {
        name: '$RAX (Return)',
        address: '0x7fffffffe008',
        buggyValue: 'SIGSEGV (Code 139)',
        patchedValue: '0x0 (ParseStatus::SUCCESS)',
        status: 'MUTATED',
        description: 'CPU return register indicating process exit code.',
      },
      {
        name: 'header->message_id',
        address: '0x0000000000000000',
        buggyValue: 'TRAP / ACCESS VIOLATION',
        patchedValue: '0x0000104A (ID #4170)',
        status: 'VIOLATION',
        description: 'Target struct field offset +0x0 inside TelemetryHeader.',
      },
      {
        name: 'len ($RSI)',
        address: '0x7fffffffe010',
        buggyValue: '1024 bytes (unchecked)',
        patchedValue: '1024 bytes (bounds checked >= 12B)',
        status: 'SAFE',
        description: 'Payload length register passed from network layer.',
      },
    ],
    executionTrace: [
      {
        step: 1,
        instruction: 'call parse_telemetry_payload',
        location: 'main.cpp:118',
        state: 'NORMAL',
        detail: 'Stack frame pushed; $RDI assigned from socket buffer parser.',
      },
      {
        step: 2,
        instruction: 'test %rdi, %rdi',
        location: 'packet_parser.cpp:18',
        state: 'WARN',
        detail: 'Original code omitted pointer test. Patched code evaluates %rdi == 0.',
      },
      {
        step: 3,
        instruction: 'mov (%rdi), %eax',
        location: 'packet_parser.cpp:42',
        state: 'FAULT',
        detail: 'Original: Attempted 32-bit load from address 0x0. Hardware Page Fault triggered.',
      },
      {
        step: 4,
        instruction: 'je .L_ERR_NULL_HEADER',
        location: 'packet_parser.cpp:21',
        state: 'RECOVERED',
        detail: 'Patched: Jump taken to safe error handling block. No hardware trap invoked.',
      },
    ],
  },

  '3: Python Null Reference': {
    id: 'demo-python-null',
    title: '3: Python Null Reference',
    filename: 'services/analytics_pipeline.py',
    language: 'python',
    mode: 'systems',
    severity: 'HIGH',
    category: 'Dynamic Type AttributeError & Unhandled NoneType',
    confidence: 98.7,
    estimatedFixTime: '< 3 mins',
    rootCause:
      'In `process_event_batch()`, the statement `payload["user_profile"].get("tier", "free")` assumes `user_profile` is always a populated dictionary. In guest or anonymous user events, `"user_profile"` is explicitly `None`. Invoking `.get()` on a `NoneType` object raises an unhandled `AttributeError`, causing downstream batch processing workers to crash.',
    remedySummary:
      'Implemented safe dictionary chaining with fallback defaults: `(payload.get("user_profile") or {}).get("tier", "free")` and added pydantic/dataclass schema verification before metric emission.',
    mockImageUrl: PYTHON_NULL_SVG,
    mockImageTitle: 'Datadog / APM Exception Traceback (AttributeError: NoneType)',
    logs: `Traceback (most recent call last):
  File "/app/services/analytics_pipeline.py", line 78, in process_event_batch
    user_tier = payload["user_profile"].get("tier", "free")
AttributeError: 'NoneType' object has no attribute 'get'
  During handling of the above exception, another exception occurred:
  File "/app/workers/ingest_worker.py", line 34, in run_loop
    task.fail_silently()
[ERROR] Worker pool worker-3 halted unexpectedly. 14,200 events queued.`,
    buggyCode: `# Buggy Analytics Pipeline: Unsafe nested dictionary access on optional fields
from typing import Dict, Any, List

def process_event_batch(batch_records: List[Dict[str, Any]]) -> int:
    processed_count = 0
    
    for event in batch_records:
        payload = event.get("payload", {})
        
        # BUG: When user is anonymous, payload["user_profile"] is None (not a dict)
        # Calling .get() directly on None triggers AttributeError: 'NoneType' has no attribute 'get'
        user_tier = payload["user_profile"].get("tier", "free")
        
        print(f"Emitting metric for tier: {user_tier}")
        processed_count += 1
        
    return processed_count`,
    patchedCode: `# Patched Analytics Pipeline: Safe Chaining & Defensive Fallbacks
from typing import Dict, Any, List

def process_event_batch(batch_records: List[Dict[str, Any]]) -> int:
    processed_count = 0
    
    for event in batch_records:
        payload = event.get("payload") or {}
        
        # FIX: Guard against NoneType user_profile via safe dictionary fallback
        user_profile = payload.get("user_profile") or {}
        user_tier = user_profile.get("tier", "free")
        
        print(f"Safely emitting metric for tier: {user_tier}")
        processed_count += 1
        
    return processed_count`,
    memoryRegisters: [
      {
        name: 'payload["user_profile"]',
        address: '0x7f8841a0e280',
        buggyValue: 'None (NoneType instance)',
        patchedValue: '{} (Safe empty dict fallback)',
        status: 'VIOLATION',
        description: 'Object reference in Python heap missing dict method table.',
      },
      {
        name: 'user_tier',
        address: '0x7f8841a0e3f0',
        buggyValue: 'UNRESOLVED (CRASH ON DEREF)',
        patchedValue: '"free" (str primitive)',
        status: 'MUTATED',
        description: 'Target variable evaluated safely without throwing exception.',
      },
    ],
    executionTrace: [
      {
        step: 1,
        instruction: 'payload.get("user_profile")',
        location: 'analytics_pipeline.py:77',
        state: 'NORMAL',
        detail: 'Key lookup in Python dict succeeds and returns None object.',
      },
      {
        step: 2,
        instruction: 'LOAD_METHOD "get" on NoneType',
        location: 'analytics_pipeline.py:78',
        state: 'FAULT',
        detail: 'Original: tp_getattr on PyNone_Type fails. AttributeError raised into frame.',
      },
      {
        step: 3,
        instruction: 'JUMP_IF_TRUE_OR_POP {}',
        location: 'analytics_pipeline.py:10',
        state: 'RECOVERED',
        detail: 'Patched: Short-circuit "or" evaluates Falsey None to fallback empty dict.',
      },
    ],
  },
};
